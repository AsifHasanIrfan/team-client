import Button from "@components/Button";
import PublishSuccessIcon from "@components/Icons/PublishSuccessIcon";
import Link from "next/link";
import { useRouter } from "next/router";

const PublishSuccess = () => {
  const router = useRouter();

  return (
    <div className="min-h-[80vh] bg-white p-7 rounded-[10px]">
      <div className="flex justify-center items-center py-14 lg:py-24">
        <div>
          <PublishSuccessIcon />
          <p className="font-semibold text-2xl mt-4 my-3">
            Your job post published successfully
          </p>
          <p className="font-normal hidden md:block text-[#454545] text-2xl my-3">
            Try to different search for better result
          </p>
          <Button
            onClick={() =>
              router.push('/dashboard/admin-marketplace')
            }
            className="!mt-16 mx-auto"
          >
            Back To Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PublishSuccess;