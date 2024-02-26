import { Billboard } from "@/types";

interface BillboardProps {
  data: Billboard;
}

const Billboard: React.FC<BillboardProps> = ({
  data
}) => {
  return ( 
    <div className="py-8 rounded-xl overflow-hidden">
      <div style={{ backgroundImage: `url(${data?.imageUrl})` }} className="rounded-xl relative aspect-square md:aspect-[2.4/1] overflow-hidden bg-cover">
        <div className="h-full w-full flex flex-col justify-center items-center text-center gap-y-8">
          <div className="text-background dark:text-primary uppercase font-extrabold text-4xl sm:text-6xl lg:text-8xl drop-shadow-[0_8px_8px_rgba(0,0,0,0.9)] sm:max-w-xl max-w-xs">
            {data.label}
          </div>
        </div>
      </div>
    </div>
   );
};

export default Billboard;
