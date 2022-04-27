import { useParams } from "react-router"

const CataloguePage = () => {
    const params = useParams()

    return <div> 
        {
            params.categoryName
        }
    </div>
}

export default CataloguePage