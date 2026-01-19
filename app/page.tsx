import Management from "@/components/Management";
import Organization from "@/components/Organization";
import WhyFopsco from "@/components/WhyFopsco";
import AboveTheFold from "@/components/AboveTheFold";
import Testimonial from "@/components/Testimonial";
import Partnerships from "@/components/Partnership";

export default function Home() {
    return (
        <main>
            <AboveTheFold />
            <WhyFopsco />
            <Management />
            <Organization />
            <Testimonial />
            <Partnerships />
        </main>
    );
}