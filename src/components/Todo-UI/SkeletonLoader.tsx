import { Skeleton } from "../ui/skeleton";
import { motion } from "framer-motion";

type SheletonLoaderProps = {};

export default function SkeletonLoader({}: SheletonLoaderProps) {
  const numberOfLoaders = [1, 2, 3, 4, 5, 6];
  return (
    <main className="minHeight mx-auto max-w-[1980px] space-y-10 px-4 py-8 sm:px-8 sm:py-16 md:space-y-16 lg:p-24 xl:p-28 xl:py-20">
      <div className="flex items-center justify-between gap-4 md:items-end">
        <Skeleton className="h-12 w-[15ch]" />
        <Skeleton className="h-8 w-[100px]" />
      </div>

      <div className="grid gap-4 min-[550px]:grid-cols-2 lg:grid-cols-3">
        {numberOfLoaders.map((loader, i) => {
          return (
            <motion.article
              key={loader}
              className="grid space-y-4 rounded-xl border border-border p-4 md:space-y-4 lg:space-y-5"
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
              <div className="flex items-center justify-between gap-4">
                <div className="w-full space-y-2">
                  <Skeleton className="h-3 w-full sm:h-4" />
                  <Skeleton className="h-3 w-10/12 sm:h-4" />
                </div>
                <Skeleton className="h-9 w-9" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-3 w-full sm:h-4" />
                <Skeleton className="h-3 w-full sm:h-4" />
                <Skeleton className="h-3 w-[75%] sm:h-4" />
              </div>
              <div className="flex items-center justify-between gap-4">
                <Skeleton className="h-6 w-6" />
                <div className="itemse-center flex space-x-2">
                  <Skeleton className="h-7 w-7" />
                  <Skeleton className="h-7 w-7" />
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>

      <div className="slide-in fixed bottom-12 right-8 z-10 shadow-lg sm:right-12 lg:bottom-16 lg:right-16">
        <Skeleton className="h-16 w-16 border" />
      </div>
    </main>
  );
}
