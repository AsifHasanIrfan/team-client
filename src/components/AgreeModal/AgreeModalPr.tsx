import Button from "@components/Button";
import TableLoader from "@components/Loaders/TableLoader";
import { signout } from "@redux/actions/auth";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

const parse = require('html-react-parser');

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  data: any;
  handleAgree: any;
  policyLoading: boolean;
  loading: boolean;
  handleDisAgree: any;
  disLoading: boolean;
  qloading: boolean;
  setType: any;
}

const AgreeModalPr = ({ open, setOpen, data, handleAgree, policyLoading, loading, handleDisAgree, disLoading, qloading, setType }: Props) => {

  const dispatch = useDispatch();
  const router = useRouter()

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 z-[1000000] flex items-center justify-center">
      <div
        className={`absolute top-0 bottom-0 left-0 right-0 bg-[#00000047]`}
      ></div>

      <div className="rounded-[8px] max-h-[95vh] overflow-y-auto no-scrollbar z-10 relative">
        <div className={`flex justify-between items-center bg-[#263238] px-2`}>
          <div className="py-[13px] pl-[20px] w-full h-full ">
            <p className="text-[16px] !text-white font-[500] leading-[22px] cursor-default">
              Privacy & Policy
            </p>
          </div>

          {/* <IoMdClose
            className={`z-[9999] hover:text-primary text-white pr-4 w-[40px] text-[23px] cursor-pointer transition ease-in-out duration-300`}
            onClick={() => setOpen(false)}
          /> */}
        </div>

        <div className={`bg-white relative pb-[30px] pt-[20px]`}>
          <div
            className={`md:w-[650px] bg-white z-50 rounded-[10px] md:px-[15px] lg:px-[15x] md:pt-0 px-2`}
          >
            {policyLoading ? (
              <TableLoader />
            ) : (
              <>

                <div className={`bg-white relative md:max-h-[60vh] max-h-[75vh]`}>
                  <div className='mt-5 md:max-h-[55vh] max-h-[65vh] w-max-content overflow-y-scroll black__scrolbar basic-change pl-10'>
                    {parse(data?.content ? data?.content : '')}
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-6 justify-center mt-10">
                  <Button
                    className={`!bg-transparent !shadow-none transition duration-300 ease-in-out !rounded-[10px] !border border-primary hover:text-white hover:!bg-primary text-primary ${qloading && '!text-white'}`}
                    loading={qloading}
                    onClick={() => {
                      setType('q-loading')
                      handleDisAgree();
                      dispatch(signout())
                      router.push('/')
                    }}
                  >
                    I Have Questions ?
                  </Button>

                  <Button
                    className={`!bg-transparent !shadow-none transition duration-300 ease-in-out !rounded-[10px] !border border-primary hover:text-white hover:!bg-primary text-primary ${disLoading && '!text-white'}`}
                    loading={disLoading}
                    onClick={() => {
                      setType('dis-loading')
                      handleDisAgree();
                      dispatch(signout())
                      router.push('/')
                    }}
                  >
                    I Don&apos;t Agree
                  </Button>

                  <Button
                    onClick={() => handleAgree()}
                    className="!rounded-[10px]"
                    loading={loading}
                  // loadingText='Agreeing'
                  >
                    I Agree
                  </Button>
                </div>

              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgreeModalPr;
