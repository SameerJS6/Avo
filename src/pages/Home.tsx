import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
type Props = {};

export default function Home({}: Props) {
  return (
    <main className="centered isolate relative text-center p-4 mx-auto max-w-[1440px]">
      <motion.div
        className="space-y-8"
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="space-y-3">
          <h1 className="capitalize text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-tl from-foreground to-primary/50">
            Harmonize your day with AVO
          </h1>
          <p className="max-w-[600px] text-accent-foreground md:text-xl  mx-auto">
            Experience the extraordinary as you navigate life's rhythm
            seamlessly.
          </p>
        </div>

        <div>
          <Link to="/dashboard" className="w-fit mx-auto">
            <Button>Begin Your Journey</Button>
          </Link>
        </div>
      </motion.div>

      <motion.div
        className="absolute inset-x-0 top-[calc(100%-25rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-55rem)]"
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-primary/50 rotate-45 opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </motion.div>
    </main>
  );
}
