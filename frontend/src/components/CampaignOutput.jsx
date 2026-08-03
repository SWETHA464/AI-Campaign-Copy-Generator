import toast from "react-hot-toast";
import {FaRobot,FaCopy,FaEnvelope,FaWhatsapp,FaSms} from "react-icons/fa";
import { MdPreview } from "react-icons/md";

function CampaignOutput({ campaign }) {

    if (!campaign) return null;

    const copyText = (text) => {

        navigator.clipboard.writeText(text);

        toast.success("Copied to clipboard!");

    };

    const Card = ({ icon, title, content, isList = false }) => (

        <div className="bg-blue-50 rounded-2xl shadow-xl border border-blue-200 p-6">

            <div className="flex justify-between items-center mb-4">

                <div className="flex items-center gap-3">

                    <div className="text-blue-600 text-2xl">
                        {icon}
                    </div>

                    <h3 className="text-xl font-bold text-blue-700">
                        {title}
                    </h3>

                </div>

                <button
                    onClick={() =>
                        copyText(
                            Array.isArray(content)
                                ? content.join("\n")
                                : content
                        )
                    }
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
                >
                    <FaCopy />
                    Copy
                </button>

            </div>

            {isList ? (

                <ol className="list-decimal pl-6 space-y-2 text-blue-900">

                    {content.map((item, index) => (

                        <li key={index}>
                            {item}
                        </li>

                    ))}

                </ol>

            ) : (

                <p className="whitespace-pre-wrap text-blue-900 leading-7">
                    {content}
                </p>

            )}

        </div>

    );

    return (

        <div className="max-w-6xl mx-auto mt-10 mb-12">

            <div className="grid gap-6">

                <Card
                    icon={<FaEnvelope />}
                    title="Email Subject Lines"
                    content={campaign.email_subjects}
                    isList={true}
                />

                <Card
                    icon={<MdPreview />}
                    title="Email Preview Texts"
                    content={campaign.preview_texts}
                    isList={true}
                />

                <Card
                    icon={<FaEnvelope />}
                    title="Promotional Email"
                    content={campaign.promotional_email}
                />

                <Card
                    icon={<FaWhatsapp />}
                    title="WhatsApp Message"
                    content={campaign.whatsapp_message}
                />

                <Card
                    icon={<FaSms />}
                    title="SMS Message"
                    content={campaign.sms}
                />

            </div>

        </div>

    );

}

export default CampaignOutput;