import landing from "../images/landing.png";
import footer from "../images/footer.png";
import header from "../images/header.png";
interface AttainmentSectionProps {
  schoolName: string;
}

export default function LandingSection({ schoolName }: AttainmentSectionProps) {
  return (
    <div className="text-center p-6 bg-white rounded shadow-md w-full max-w-4xl mb-6">
      <div className="w-full flex justify-center ">
        <img
          src={"#"}
          alt="Benchmark Logo"
          className="w-full object-cover"
        />
      </div>
      <h2 className="text-xl font-semibold flex justify-around">
        <span className=" text-teal-700">Arabic Benchmark Test</span>
        <span className=" text-teal-700">اختبار اللغة العربية المعياري</span>
      </h2>
      <h3 className="text-lg font-bold text-[#f3d682] mt-2">
        The Combined Report Based on Expected Benchmark Ranges
      </h3>
      <h3 className="text-lg font-bold text-[#f3d682]">
        التقرير المجمع بناء على نطاقات قياس الأداء المتوقع
      </h3>
      <div className="flex justify-center mt-4">
        <img src={landing} />
      </div>
      <div className="mt-4">
        <p className=" text-green-800 font-bold ">{schoolName}</p>
        <p className="text-lg text-blue-600 font-semibold">2023-2024</p>
        <p className="text-lg font-semibold">
          Release Date: {new Date().toISOString().split("T")[0]}
        </p>
        <a href="https://www.abt-assessments.com" className=" font-bold ">
          www.abt-assessments.com
        </a>
        <p className="font-bold">support@abt-assessments.com</p>
      </div>
      {/* <div className="w-full flex justify-center mt-4">
        <img src={footer} alt="Footer Logos" className="w-full object-cover" />
      </div> */}
    </div>
  );
}
