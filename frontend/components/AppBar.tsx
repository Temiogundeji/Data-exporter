import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const AppBar = () => {
    const { data: session } = useSession();
    return (
        <div>
            <nav>
                <ul className="flex flex-row justify-between">
                    <div>
                        <li>
                            <Link href="/">Xportt</Link>
                        </li>
                    </div>
                    <div>
                        <li>
                            <Link href="/">About</Link>
                        </li>

                        {session?.user ? (
                            <>
                                {" "}
                                <li>
                                    <Link href="/">{session?.user?.name}</Link>
                                </li>
                                <li>
                                    <Link className="text-white" onClick={() => signIn()} href="/login">Login</Link>
                                </li>
                            </>
                        ) : (
                            <li>
                                <Link className="text-white" onClick={() => signOut()} href="/">Logout</Link>
                            </li>
                        )}
                    </div>
                </ul>
            </nav>
        </div>
    );
};

export default AppBar;
