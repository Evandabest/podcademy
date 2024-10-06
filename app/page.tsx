"use client";
import { useRouter } from "next/navigation";

interface PodcademyLandingPageProps {
  onSignUp: () => void;
}

const PodcademyLandingPage: React.FC<PodcademyLandingPageProps> = ({
  onSignUp,
}) => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-black p-4">
      <main className="text-center max-w-2xl">
        <h2 className="text-4xl font-bold mb-6">Learn better.</h2>
        <p className="text-xl mb-8">
          Studying doesn't have to be painful. With podcademy, you can master
          any subject on the go. Upload study materials to generate a
          personalized mini-podcast and ace your exams!
        </p>
        <button
          className="bg-gray-200 text-black px-6 py-3 rounded-full text-lg font-semibold hover:bg-gray-300 transition-colors"
          onClick={() => router.push("/home")}
        >
          Sign up now
        </button>
      </main>
    </div>
  );
};

export default PodcademyLandingPage;
