"use client";

import {
  CircleUserRound,
  FileText,
  ImagePlus,
  LifeBuoy,
  LoaderCircle,
  LogOut,
  User,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUser } from "@/hooks/useUser";
import { useEffect, useState } from "react";
import fileToBase64 from "@/actions/convert-file-to-base64";
import { signOut, updateDocument, uploadBase64 } from "@/lib/firebase";
import toast from "react-hot-toast";
import Image from "next/image";
import { setInLocalStorage } from "@/actions/setInLocalStorage";

export default function ProfileDropdown() {
  let user = useUser();
  const [image, setImage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // ------ Choose a profile image ------
  const chooseImage = async (event: any) => {
    const file = event.target.files[0];

    console.log(file);

    setIsLoading(true);

    try {
      const base64 = await fileToBase64(file);
      const imagePath = `${user?.uid}/profile`;
      const imageUrl = await uploadBase64(imagePath, base64);
      await updateDocument(`users/${user?.uid}`, { image: imageUrl });
      setImage(imageUrl);
      if (user) {
        user.image = imageUrl;
        setInLocalStorage("user", user);
      }
      toast.success("Successfully updated");
    } catch (error: any) {
      toast.error(error.message, { duration: 2500 });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user?.image) setImage(user.image);
  }, [user]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <span className="mr-2">Account</span>
          {image ? (
                <Image
                  className="object-cover w-6 h-6 rounded-full m-auto"
                  src={image}
                  width={1000}
                  height={1000}
                  alt="user-img"
                />
              ) : (
                <CircleUserRound className="m-auto w-6 h-6" />
              )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel className="text-center">
          {isLoading ? (
            <LoaderCircle className="w-14 h-14 animate-spin m-auto mb-3" />
          ) : (
            <>
              {image ? (
                <Image
                  className="object-cover w-20 h-20 rounded-full m-auto"
                  src={image}
                  width={1000}
                  height={1000}
                  alt="user-img"
                />
              ) : (
                <CircleUserRound className="m-auto w-20 h-20" />
              )}
              <div className="flex justify-center relative bottom-2">
                <div>
                  <input
                    id="files"
                    type="file"
                    className="hidden"
                    accept="image/png, image/webp, image/jpg"
                    onChange={(event) => chooseImage(event)}
                  />
                  <label htmlFor="files">
                    <div className="w-[40px] h-[28px] bg-slate-950 hover:bg-slate-800 flex justify-center items-center text-white cursor-pointer rounded-lg">
                      <ImagePlus className="w-[18px] h-[18px" />
                    </div>
                  </label>
                </div>
              </div>
            </>
          )}
          <div>{user?.name}</div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="cursor-pointer">
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <FileText className="mr-2 h-4 w-4" />
            <span>Terms and Conditions</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <LifeBuoy className="mr-2 h-4 w-4" />
            <span>Support</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer" onClick={() => signOut()}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
