import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    return (<>
        <div className="bg-background">
            <div className="max-w-7xl mx-auto py-7">
                <div className="flex items-center justify-between text-white">
                    <div className="flex gap-5">
                        <h2 className="text-lg">Privacy Policy</h2>
                        <h2 className="text-lg">Terms</h2>
                        <h2 className="text-lg">Copyright Policy</h2>
                    </div>
                    <div>@ 2024 KULAM</div>
                    <div className="flex gap-5 items-center">
                        <Link href="/">
                            <Image src="/images/insta.svg" alt="insta" width={30} height={30} />
                        </Link>
                        <Link href="/">
                            <Image src="/images/fb.svg" alt="fb" width={15} height={15} />
                        </Link>
                        <Link href="/">
                            <Image src="/images/x.svg" alt="x" width={25} height={25} />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </>
    );
}
