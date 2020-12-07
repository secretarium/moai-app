import React from 'react';
import { FormEvent, useState } from 'react';

const ContactForm: React.FC = () => {

    const [email, setEmail] = useState<string>('');
    const [description, setDescription] = useState<string>('');

    const [docPres, setDocPres] = useState(false);
    const [docShortPres, setDocShortPres] = useState(false);
    const [docShortTechPres, setDocTechPres] = useState(false);
    const [docWP, setDocWP] = useState(false);
    const [docProto, setDocProto] = useState(false);

    const [isRegistering, setIsRegistering] = useState(false);
    const [resultMessage, setResultMessage] = useState('');

    const sendInfoRegistration = (event: FormEvent) => {
        event.preventDefault();

        setIsRegistering(true);
        setResultMessage('');
        const formData = new URLSearchParams();
        formData.append('email', email);
        formData.append('description', description);
        formData.append('docPres', docPres.toString());
        formData.append('docShortPres', docShortPres.toString());
        formData.append('docShortTechPres', docShortTechPres.toString());
        formData.append('docWP', docWP.toString());
        formData.append('docProto', docProto.toString());

        fetch('/api/infoRegister', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(() => {
                setIsRegistering(false);
                setResultMessage('We have received your request. Thank you !');
            })
            .catch(() => {
                setIsRegistering(false);
                setResultMessage('Oops, something went wrong! Please try again');
            });
    };

    return (
        <form className="w-full max-w-lg" onSubmit={sendInfoRegistration}>
            <h1 id="contact" className="text-3xl mb-4">contact us for documentation</h1>
            <div className="flex flex-wrap -mx-3">
                <div className="w-full px-3">
                    <input value={email} onChange={(e) => setEmail(e.target.value)} required className="appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="email" type="email" placeholder="Email" />
                </div>
            </div>
            <div className="flex flex-wrap -mx-3">
                <div className="w-full px-3">
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} required className=" no-resize appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-48 resize-none" id="message" placeholder="Let us know who you are and a summary of your interest"></textarea>
                </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                    <label><input type="checkbox" name="documents" className="mr-2 leading-tight" checked={docPres} onChange={() => setDocPres(!docPres)} />Presentation (15 slides)</label><br />
                    <label><input type="checkbox" name="documents" className="mr-2 leading-tight" checked={docShortPres} onChange={() => setDocShortPres(!docShortPres)} />Short presentation (2 pages)</label><br />
                    <label><input type="checkbox" name="documents" className="mr-2 leading-tight" checked={docShortTechPres} onChange={() => setDocTechPres(!docShortTechPres)} />Short presentation - technical (2 pages)</label><br />
                    <label><input type="checkbox" name="documents" className="mr-2 leading-tight" checked={docWP} onChange={() => setDocWP(!docWP)} />White paper (49 pages)</label><br />
                    <label><input type="checkbox" name="documents" className="mr-2 leading-tight" checked={docProto} onChange={() => setDocProto(!docProto)} />Secure Connection Protocol (15 pages)</label><br />
                </div>
            </div>
            <div className="md:flex md:items-center pt-4">
                <div className="md:w-full">
                    <button className="shadow bg-accent-2 hover:bg-red-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit">
                        Request information
                    </button>
                    <br />
                    <span className="block pt-4">{isRegistering ? 'Registering ...' : resultMessage}</span>
                </div>
                <div className="md:w-2/3"></div>
            </div>
        </form>
    );
};

export default ContactForm;
