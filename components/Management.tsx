import Image from "next/image";

export default function Management() {
    return (
        <section className="mx-auto xl:w-4/5 px-5 py-20">
            <div className="w-full xl:w-5/6 mx-auto mb-16 text-center">
                <span className="mb-5 relative inline-block uppercase text-xs pl-5 text-[#F85E00] dot-orange">Fopsco Management</span>
                <h3 className="text-3xl md:text-4xl mb-5 font-semibold cloud-burst">Meet the Team Behind FOPSCo</h3>
                <p className="text-md md:text-lg cloud-burst font-light">Led by experienced trainers, digital professionals, and cooperative leaders, <br className="rm-br-lg" />the FOPSCo management team is committed to empowering Filipino online professionals and advancing ethical digital transformation nationwide.</p>
            </div>
            <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 justify-center">
                <div className="rounded-t-3xl bg-ghost-white text-center">
                    <Image 
                        src="/Roche-Rivera.webp" 
                        alt="Rochefel Rivera - Chairman" 
                        width={295} 
                        height={337} 
                        className="mx-auto" 
                    />
                    <div className="w-full m-0 bg-cloud-burst text-center py-3 rounded-b-3xl">
                        <h3 className="font-bold text-white">Rochefel Rivera</h3>
                        <p className="text-sm text-white font-light">Chairman</p>
                    </div>
                </div>
                <div className="rounded-t-3xl bg-ghost-white text-center">
                    <Image src="/Sherlane-Fortunado.webp" alt="Sherlane Fortunado - Vice Chairman" width={295} height={337} className="mx-auto" />
                    <div className="w-full m-0 bg-cloud-burst text-center py-3 rounded-b-3xl">
                        <h3 className="font-bold text-white">Sherlane Fortunado</h3>
                        <p className="text-sm text-white font-light">Vice Chairman</p>
                    </div>
                </div>
                <div className="rounded-t-3xl bg-ghost-white text-center">
                    <Image src="/Dennis-Paguio.webp" alt="Dennis Paguio - Head of International" width={295} height={337} className="mx-auto" />
                    <div className="w-full m-0 bg-cloud-burst text-center py-3 rounded-b-3xl">
                        <h3 className="font-bold text-white">Dennis Paguio</h3>
                        <p className="text-sm text-white font-light">Events and Partnerships / BOD</p>
                    </div>
                </div>
                <div className="rounded-t-3xl bg-ghost-white text-center">
                    <Image src="/Officers-Jehan.webp" alt="Jehan Forro - GAD / BOD" width={295} height={337} className="mx-auto" />
                    <div className="w-full m-0 bg-cloud-burst text-center py-3 rounded-b-3xl">
                        <h3 className="font-bold text-white">Jehan Forro</h3>
                        <p className="text-sm text-white font-light">GAD / BOD</p>
                    </div>
                </div>                
                <div className="rounded-t-3xl bg-ghost-white text-center">
                    <Image src="/Richie-Rebamuntan.webp" alt="Richie Rebamuntan - Head of Marketing Committee / BOD" width={295} height={337} className="mx-auto" />
                    <div className="w-full m-0 bg-cloud-burst text-center py-3 rounded-b-3xl">
                        <h3 className="font-bold text-white">Richie Rebamuntan</h3>
                        <p className="text-sm text-white font-light">Head of Marketing Committee / BOD</p>
                    </div>
                </div>
                <div className="rounded-t-3xl bg-ghost-white text-center">
                    <Image src="/MJ-Soriano.webp" alt="MJ Soriano - Board of Director" width={295} height={337} className="mx-auto" />
                    <div className="w-full m-0 bg-cloud-burst text-center py-3 rounded-b-3xl">
                        <h3 className="font-bold text-white">MJ Soriano</h3>
                        <p className="text-sm text-white font-light">Board of Director</p>
                    </div>
                </div>
                <div className="rounded-t-3xl bg-ghost-white text-center">
                    <Image src="/Mark-Esmana.webp" alt="Mark Esmana - Board of Director" width={295} height={337} className="mx-auto" />
                    <div className="w-full m-0 bg-cloud-burst text-center py-3 rounded-b-3xl">
                        <h3 className="font-bold text-white">Mark Esmana</h3>
                        <p className="text-sm text-white font-light">Board of Director</p>
                    </div>
                </div>                                        
            </div>
        </section>
    );
}