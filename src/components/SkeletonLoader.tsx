import { Skeleton } from "./ui/skeleton";
import { motion } from "framer-motion";

type SheletonLoaderProps = {};

export default function SkeletonLoader({}: SheletonLoaderProps) {
  const numberOfLoaders = [1, 2, 3, 4, 5, 6];
  return (
    <main className="max-w-[1980px] minHeight mx-auto py-8 px-4 sm:py-16 sm:px-8 lg:p-24 xl:p-28 xl:py-20 space-y-10 md:space-y-16">
      <div className="flex justify-between items-center md:items-end gap-4">
        <Skeleton className="h-12 w-[15ch]" />
        <Skeleton className="h-8 w-[100px]" />
      </div>

      <div className="grid min-[550px]:grid-cols-2 lg:grid-cols-3 gap-4">
        {numberOfLoaders.map((loader, i) => {
          return (
            <motion.article
              key={loader}
              className="p-4 grid rounded-xl space-y-4 border border-border md:space-y-4 lg:space-y-5"
              variants={{
                hidden: (i) => ({
                  opacity: 0,
                  y: 10 * i,
                }),
                visible: (i) => ({
                  opacity: 1,
                  y: 0,
                  transition: { delay: 0.05 * i },
                }),
                removed: {
                  opacity: 0,
                  y: 10,
                },
              }}
              initial="hidden"
              animate="visible"
              exit="removed"
              custom={i}
            >
              <div className="flex justify-between items-center gap-4">
                <div className="w-full space-y-2">
                  <Skeleton className="w-full h-3 sm:h-4" />
                  <Skeleton className="w-10/12 h-3 sm:h-4" />
                </div>
                <Skeleton className="w-9 h-9" />
              </div>
              <div className="space-y-2">
                <Skeleton className="w-full h-3 sm:h-4" />
                <Skeleton className="w-full h-3 sm:h-4" />
                <Skeleton className="w-[75%] h-3 sm:h-4" />
              </div>
              <div className="flex justify-between items-center gap-4">
                <Skeleton className="w-6 h-6" />
                <div className="flex itemse-center space-x-2">
                  <Skeleton className="w-7 h-7" />
                  <Skeleton className="w-7 h-7" />
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>

      <div className="fixed z-10 bottom-12 right-8 sm:right-12 lg:bottom-16 lg:right-16 shadow-lg slide-in">
        <Skeleton className="w-16 h-16 border" />
      </div>
    </main>
  );
}
