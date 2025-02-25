import { Home } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const NotFoundPage = () => {
    return (
        <div className="flex h-full flex-col items-center space-y-4 justify-center px-6">
            <Image src="/not-found2.png" alt="Página não encontrada" width={200} height={200} />
            <h2 className="text-center">Ops, não encontramos o que está procurando.</h2>
            <div className="flex items-center gap-2">
                <Home size={20} className="text-blue-500" />
                <Link href="/">
                    <p className="text-blue-500 underline">Voltar para a página inicial</p>
                </Link>
            </div>
        </div>
    );
}
 
export default NotFoundPage;