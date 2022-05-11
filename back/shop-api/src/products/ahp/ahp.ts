import {  Criteria } from "../dto/request-product.dto";
import { ResponseProductDto } from "../dto/response-product.dto";
import { Category, defaultCriterias, PropCompareTypes } from "../types/types";

export class AHP {
    static readonly RI = [
        0, 0, 0.58, 0.9, 1.12, 1.24, 1.32, 1.41, 1.45, 1.49
    ];

    static async compare(category: Category, crits: Criteria[], products: ResponseProductDto[]) {
        let alternativesAmount = products.length
        let altRatingVectors: number[][] = await this.getRates(category, crits, products)
        let critPriorVector: number[] = crits.map((crit) => parseInt(crit.importance))

        let critCompareMatrix = await this.buildCompareMatrix(critPriorVector)
        let altCompareMatrices = await Promise.all(altRatingVectors.map((vector) => this.buildCompareMatrix(vector)))
        let critFreeTerms = await this.buildFreeTermsMatrix(critCompareMatrix)
        let altsFreeTerms = await Promise.all(altCompareMatrices.map((matrix) => this.buildFreeTermsMatrix(matrix)))
        let altsFreeTermsForMultiplying = Array(alternativesAmount).fill(0).map((v, index) => {
            return altsFreeTerms.map((altFreeTerm) => altFreeTerm[index])
        })
        let results = await Promise.all(altsFreeTermsForMultiplying.map((freeTerm) => this.vectorMultiply(freeTerm, critFreeTerms)))
        return results
    }

    static async buildCompareMatrix(vector: number[]) {
        let len = vector.length
        let compareMatrix: number[][] = []
        for (let i = 0; i < len; i++) {
            compareMatrix[i] = []
            for (let j = 0; j < len; j++) {
                if (j == i) {
                    compareMatrix[i][j] = 1
                } else {
                    let priorirtyDiff = vector[i] - vector[j]
                    if (priorirtyDiff <= 0) {
                        compareMatrix[i][j] = -priorirtyDiff * 2 + 1
                    }
                    else {
                        compareMatrix[i][j] = 1 / (priorirtyDiff * 2 + 1);
                    }
                }
            }
        }
        return compareMatrix
    }

    static async buildFreeTermsMatrix(matrix: number[][]) {
        let len = matrix[0].length
        let mults: number[] = []
        for (let i = 0; i < len; i++) {
            let rowProduct = 1
            for (let j = 0; j < len; j++) {
                rowProduct *= matrix[i][j]
            }
            mults[i] = Math.pow(rowProduct, 1 / len)
        }

        let powersSum = mults.reduce((prev, cur) => prev + cur, 0)
        let freeTerms: number[] = []
        for (let i = 0; i < len; i++) {
            freeTerms[i] = mults[i] / powersSum
        }
        let multitplyRes: number[] = []
        for (let i = 0; i < len; i++) {
            multitplyRes[i] = await AHP.vectorMultiply(matrix[i], freeTerms) // may be wrong
        }
        
        let CR = ((multitplyRes.reduce((prev, cur) => prev + cur, 0) - len) / (len - 1)) / this.RI[len - 1]

        if (CR > 0.1) {
            throw new Error(`CR GREATER THAN 0.1 =${CR}`)
        }

        return freeTerms
    }

    static async getRates(category: Category, crits: Criteria[], products: ResponseProductDto[]): Promise<number[][]> {
        let ratingVectors: number[][] = []

        for (let crit of crits) {
            let critRatingVector: number[] = []
            let propValues: string[] = []
            let categoryProp = category.props[crit.index]
            for (let product of products) { //заполнение списка значений
                if (crit.name === 'Цена') {
                    propValues.push(product.price.toString())
                } 
                if (crit.name === 'Производитель') {
                    propValues.push(product.manufacturer)
                } 
                if (crit.name === 'Пользовательский рейтинг') {
                    let totalRating = 0
                    let totalReviews = 0
                    for (let i = 0; i < 5; i++) {
                        let currentScore: number = product.rating[5 - i]
                        totalRating += (5 - i) * currentScore
                        totalReviews += currentScore
                    }
                    let averageRating = (totalRating / totalReviews) || 3
                    propValues.push(averageRating.toString())
                } 
                if (crit.name === 'Год выпуска') {
                    propValues.push(product.releaseYear)
                } 
                if (!defaultCriterias.includes(crit.name)) {
                    propValues.push(product.props[crit.index])
                }
            } 

            //Оценки
            if (crit.name === 'Цена') {
                let rates = propValues.map((price) => category.priceCategories.findIndex((tier) => {
                    return parseInt(price) >= tier[0] && parseInt(price) <= tier[1]
                }) + 1)
                critRatingVector.push(...rates)
            }
            if (crit.name === 'Пользовательский рейтинг') {
                let values = propValues.map((value) => parseFloat(value))
                critRatingVector.push(...values.map((value) => {
                    return Math.ceil(5 - value) + 1
                }))
            }
            if (crit.name === 'Год выпуска') {
                let values = propValues.map((value) => parseInt(value))
                let max = Math.max(...values)
                critRatingVector.push(...values.map((value) => {
                    let rate = max - value + 1 
                    if (rate > 5) {
                        rate = 5
                    }
                    return rate
                }))
            }
            if (crit.preferences) {
                let rates = propValues.map((value) => crit.prefValues.findIndex((prefs) => 
                        prefs.includes(value)) + 1)
                critRatingVector.push(...rates)
            } else {
                if (crit.index >= 0) {
                    if (categoryProp.bestValue) {
                        let rates = propValues.map((value) => 
                            category.props[crit.index].bestValue?.includes(value)? 1 : 2)
                        critRatingVector.push(...rates)
                    }
                    if (categoryProp.tiers) {
                        let rates = propValues.map((value) => {
                            let a = categoryProp.compareType === PropCompareTypes.NUMBER_UP?
                            categoryProp.tiers.length - categoryProp.tiers.findIndex((tier) => 
                                parseFloat(value) >= tier[0] && parseFloat(value) <= tier[1])
                            :
                            categoryProp.tiers.findIndex((tier) => 
                                parseFloat(value) >= tier[0] && parseFloat(value)<= tier[1]) + 1
                            return a
                        })
                        critRatingVector.push(...rates)
                    } else {
                        let compareType = category.props[crit.index].compareType
                        if (compareType === PropCompareTypes.NUMBER_UP || compareType === PropCompareTypes.NUMBER_DOWN) {
                            let tiers: number[][] = []
                            let values = propValues.map((value) => parseFloat(value))
                            let max = Math.max(...values)
                            let min = Math.min(...values)
                            let diff = (max - min) / 5
                            for (let i = 0; i < 5; i++) {
                                tiers.push([min + diff * i, min + diff * (i + 1)])
                            }
                            critRatingVector.push(...values.map((value) => {
                                if (compareType === PropCompareTypes.NUMBER_UP) {
                                    return 5 - tiers.findIndex((tier) => tier.includes(value))
                                } else {
                                    return tiers.findIndex((tier) => tier.includes(value)) + 1
                                }
                            }))
                        }
                    }
                }
            }
            ratingVectors.push(critRatingVector)
        }

        return ratingVectors
    }

    static async vectorMultiply(vec1: number[], vec2: number[]) {
        let result = 0
        for (let i = 0; i < vec1.length; i++) {
            result += vec1[i] * vec2[i]
        }
        return result
    }
}