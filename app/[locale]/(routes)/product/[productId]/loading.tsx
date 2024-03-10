import Container from "@/components/ui/container";
import Skeleton from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <Container>
      <div className="w-full h-full p-8 min-h-screen">
        <div className="mx-auto py-10 max-w-7xl">
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
            <Skeleton className="rounded-xl aspect-square" />
            <div className="mt-10 sm:mt-16 lg:mt-0">
              <Skeleton className="rounded-xl aspect-square" />
            </div>
          </div>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <Skeleton className="aspect-square rounded-xl" />
            <Skeleton className="aspect-square rounded-xl" />
            <Skeleton className="aspect-square rounded-xl" />
          </div>
        </div>
      </div>
    </Container>
  );
}
 
export default Loading;
