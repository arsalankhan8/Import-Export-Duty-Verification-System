function Footer() {
    return (
        <footer className="bg-[#3E456A] text-white">
            <div className="mx-auto max-w-[1200px] px-4 py-10">

                <div className="flex flex-wrap justify-center gap-6 text-center max-[768px]:flex-col">
                    <div className="basis-[30%] max-[768px]:basis-full shrink-0 flex flex-col items-center">
                        <h3 className="font-semibold text-lg mb-[0px] !text-white" style={{ color: '#ffffff' }}>About Us</h3>
                        <ul className="mt-4 list-none p-[0px] m-0 w-full flex flex-col items-center justify-center gap-10">
                            <li className="w-[fit-content] border-b" style={{ borderColor: '#ffffff' }}>
                                <a href="#" className="block p-[10px] text-decoration-none !text-white hover:opacity-90" style={{ color: '#ffffff', textDecoration: 'none' }}>e-Stamping</a>
                            </li>
                            <li className="w-[fit-content] border-b" style={{ borderColor: '#ffffff' }}>
                                <a href="#" className="block p-[10px] text-decoration-none !text-white hover:opacity-90" style={{ color: '#ffffff', textDecoration: 'none' }}>Board Of Revenue</a>
                            </li>
                            <li className="w-[fit-content] border-b" style={{ borderColor: '#ffffff' }}>
                                <a href="#" className="block p-[10px] text-decoration-none !text-white hover:opacity-90" style={{ color: '#ffffff', textDecoration: 'none' }}>List of Vendors</a>
                            </li>
                        </ul>
                    </div>
                    <div className="basis-[30%] max-[768px]:basis-full shrink-0 flex flex-col items-center">
                        <h3 className="font-semibold text-lg mb-[0px] !text-white" style={{ color: '#ffffff' }}>Help</h3>
                        <ul className="mt-4 list-none  p-[0px] m-0 w-full flex flex-col items-center justify-center gap-10">
                            <li className="w-[fit-content] border-b" style={{ borderColor: '#ffffff' }}>
                                <a href="#" className="block p-[10px] text-decoration-none !text-white hover:opacity-90" style={{ color: '#ffffff', textDecoration: 'none' }}>User Guide</a>
                            </li>
                            <li className="w-[fit-content] border-b" style={{ borderColor: '#ffffff' }}>
                                <a href="#" className="block p-[10px] text-decoration-none !text-white hover:opacity-90" style={{ color: '#ffffff', textDecoration: 'none' }}>Helping Video(s)</a>
                            </li>
                        </ul>
                    </div>
                    <div className="basis-[30%] max-[768px]:basis-full shrink-0 flex flex-col items-center">
                        <h3 className="font-semibold text-lg  mb-[0px] !text-white" style={{ color: '#ffffff' }}>Contact Us</h3>
                        <ul className="mt-4 list-none  p-[0px] m-0 w-full flex flex-col items-center justify-center gap-10">
                            <li className="w-[fit-content] border-b" style={{ borderColor: '#ffffff' }}>
                                <a href="mailto:info@estamps.gos.pk" className="block p-[10px]text-decoration-none !text-white hover:opacity-90" style={{ color: '#ffffff', textDecoration: 'none' }}>Email: info@estamps.gos.pk</a>
                            </li>
                            <li className="w-[fit-content] border-b" style={{ borderColor: '#ffffff' }}>
                                <a href="#" className="block p-[10px] text-decoration-none !text-white hover:opacity-90" style={{ color: '#ffffff', textDecoration: 'none' }}>FAQs</a>
                            </li>
                        </ul>
                    </div>
                </div>

                <hr className="my-6 border-white/20" />

                <div className="flex items-center justify-center">
                    <img src={`/images/footer-urdu-img.png`} alt="Urdu seal" className="h-10 w-[30%] max-[768px]:w-[80%]" />
                </div>

                <div className="mt-4 text-center text-[13px] my-[20px]" style={{ color: '#ffffff' }}>
                    © Copyrights GoS 2025 , All Rights Reserved
                </div>
            </div>
        </footer>
    )
}


export default Footer;