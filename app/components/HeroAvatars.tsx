"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function HeroAvatars() {
  return (
    <>
      {/* Avatar 1 — left side, slightly above center */}
      <div className="absolute hidden lg:block opacity-70 hover:opacity-100 transition-opacity" style={{ left: "3%", top: "38%" }}>
        <Avatar variant="close-friends" className="w-12 h-12">
          <AvatarImage src="https://github.com/torvalds.png" alt="@torvalds" />
          <AvatarFallback>LT</AvatarFallback>
        </Avatar>
      </div>

      {/* Avatar 2 — upper right, not quite corner */}
      <div className="absolute hidden sm:block opacity-60 hover:opacity-100 transition-opacity" style={{ right: "7%", top: "12%" }}>
        <Avatar variant="normal" className="w-12 h-12">
          <AvatarImage src="https://github.com/gaearon.png" alt="@gaearon" />
          <AvatarFallback>DG</AvatarFallback>
        </Avatar>
      </div>

      {/* Avatar 3 — lower left, not quite corner */}
      <div className="absolute hidden sm:block opacity-65 hover:opacity-100 transition-opacity" style={{ left: "8%", bottom: "15%" }}>
        <Avatar variant="none" className="w-10 h-10">
          <AvatarImage src="https://github.com/sindresorhus.png" alt="@sindresorhus" />
          <AvatarFallback>SS</AvatarFallback>
        </Avatar>
      </div>

      {/* Avatar 4 — lower right, shifted inward */}
      <div className="absolute hidden sm:block opacity-70 hover:opacity-100 transition-opacity" style={{ right: "5%", bottom: "20%" }}>
        <Avatar variant="close-friends" className="w-11 h-11">
          <AvatarImage src="https://github.com/tannerlinsley.png" alt="@tannerlinsley" />
          <AvatarFallback>TL</AvatarFallback>
        </Avatar>
      </div>

      {/* Avatar 5 — upper left, offset downward */}
      <div className="absolute hidden sm:block opacity-55 hover:opacity-100 transition-opacity" style={{ left: "12%", top: "18%" }}>
        <Avatar variant="normal" className="w-11 h-11">
          <AvatarImage src="https://github.com/Rich-Harris.png" alt="@Rich-Harris" />
          <AvatarFallback>RH</AvatarFallback>
        </Avatar>
      </div>

      {/* Avatar 6 — far right, below center */}
      <div className="absolute hidden lg:block opacity-60 hover:opacity-100 transition-opacity" style={{ right: "2%", top: "62%" }}>
        <Avatar variant="none" className="w-10 h-10">
          <AvatarImage src="https://github.com/tj.png" alt="@tj" />
          <AvatarFallback>TJ</AvatarFallback>
        </Avatar>
      </div>
    </>
  );
}
