import { useGetRelatedVideosQuery } from "../../../features/api/apiSlice";
import Error from "../../ui/Error";
import RelatedVideoLoader from "../../ui/loaders/RelatedVideoLoader";
import RelatedVideo from "./Relatedvideo";

export default function RelatedVideos({id, title}){
    const { 
        data: relatedVideos,
        isLoadin, 
        isError, 
    } = useGetRelatedVideosQuery({ id, title });

    let content = null;

    if (isLoadin) {
        content = (
            <>
                <RelatedVideoLoader />
                <RelatedVideoLoader />
                <RelatedVideoLoader />
            </>
        );
    }

    if (!isLoadin && isError) {
        content = <Error message="There was an error!" />
    }

    if (!isLoadin && !isError && relatedVideos?.lenght === 0) {
        content = <Error message="No related videos found!" />
    }

    if (!isLoadin && !isError && relatedVideos?.lenght > 0) {
        content = relatedVideos.map((video) => {
            <RelatedVideo key={video.id} video={video} />
        })
    }

    return (
        <div className="col-span-full lg:col-auto max-h-[570px] overflow-y-auto">
            {content}
        </div>
    )
}