import axios from 'axios';




export const allCoursesPost = async (nameCoin: string) => {
    try {
        const response = await axios.post("http://localhost:3600/courses/all",
            { nameCoin }
        );
        
        return response.data
    } catch (error: any) {
        return "Ошибка запроса";
    }
}