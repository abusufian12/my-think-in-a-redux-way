import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import deleteImage from "../../assets/delete.svg";
import editImage from "../../assets/edit.svg";
import { useDeleteVideoMutation } from "../../features/api/apiSlice";
import Error from "../ui/Error";

export default function Description({video}){
    const {title, date, id, description} = video;
    console.log("Hello Sufian");
    const navigate = useNavigate();

    const [deleteVideo, {isSuccess, isLoading, isError}] = useDeleteVideoMutation();

    const handleDelete = () => {
        if (id) deleteVideo(id);
    }

    useEffect(() => {
        if (isSuccess) navigate("/");
    }, [isSuccess, navigate]);

    return (
        <div>
            <h1 class="text-lg font-semibold tracking-tight text-slate-800">
                {title}
            </h1>
            <div
                class="pb-4 flex items-center space-between border-b"
            >
                <h2
                    class="text-sm leading-[1.7142857] text-slate-600 w-full"
                >
                    Uploaded on {date}
                </h2>

                <div class="flex gap-10 w-48">
                    <div class="flex gap-1">
                        <div class="shrink-0">
                            <Link to={`/videos/edit/${id}`}>
                                <img
                                    class="w-5 block"
                                    src={editImage}
                                    alt="Edit"
                                />
                            </Link>
                        </div>
                        <Link to={`/videos/edit/${id}`}>
                            <span class="text-sm leading-[1.7142857] text-slate-600">
                                Edit
                            </span>
                        </Link>
                    </div>
                    <div class="flex gap-1 cursor-pointer" onClick={handleDelete}>
                        <div class="shrink-0">
                                <img
                                    class="w-5 block"
                                    src={deleteImage}
                                    alt="Delete"
                                />
                        </div>
                        <div
                            class="text-sm leading-[1.7142857] text-slate-600 cursor-pointer"
                        >
                            Delete
                        </div>
                    </div>
                </div>
            </div>

            <div
                class="mt-4 text-sm text-[#334155] dark:text-slate-400"
            >
                {description}
            </div>

            {!isLoading && isError && ( <Error message="There was an error deleting the video! " /> )}
        </div>
    )

}
