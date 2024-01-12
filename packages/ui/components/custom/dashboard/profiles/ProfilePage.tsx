"use client";
import { format } from "date-fns";
import { Input, Label } from "../../../../shadCnExport";
import React from "react";

const ProfilePage = ({ user }: { user: any }) => {
  const userDetails = user.user;
  const handleOnChange = (e: any) => {
    console.log(e.target.value);
  };
  return (
    <div className="container w-full">
      <h2 className="text-4xl font-bold text-left mb-5">Profile</h2>
      <div className="flex flex-col justify-center items-start w-full">
        <h4 className="text-2xl font-bold text-left mb-5">User Details</h4>
        <div className="w-full flex flex-wrap justify-between items-center gap-x-16 gap-y-7">
          <div className="w-full md:w-1/3 space-y-3">
            <Label htmlFor="email">Email</Label>
            <Input
              onClick={handleOnChange}
              placeholder="Email"
              defaultValue={userDetails.email}
            />
          </div>
          <div className="w-full md:w-1/3 space-y-3">
            <Label htmlFor="password">Password</Label>
            <Input
              onClick={handleOnChange}
              placeholder="password"
              defaultValue={"********"}
            />
          </div>
          <div className="w-full md:w-1/3 space-y-3">
            <Label htmlFor="email_confirmed_at">Email confirmed at</Label>
            <Input
              onClick={handleOnChange}
              placeholder="email_confirmed_at"
              value={format(userDetails.email_confirmed_at, "dd/MM/yyyy")}
            />
          </div>
          <div className="w-full md:w-1/3 space-y-3">
            <Label htmlFor="last_sign_in_at">Last Sign-in at</Label>
            <Input
              onClick={handleOnChange}
              placeholder="last_sign_in_at"
              value={format(userDetails.last_sign_in_at, "dd/MM/yyyy")}
            />
          </div>
          <div className="w-full md:w-1/3 space-y-3">
            <Label htmlFor="phone">phone</Label>
            <Input
              onClick={handleOnChange}
              placeholder="phone"
              value={userDetails?.phone || "-"}
            />
          </div>
          <div className="w-full md:w-1/3 space-y-3">
            <Label htmlFor="email_verified">email verified</Label>
            <Input
              onClick={handleOnChange}
              placeholder="email_verified"
              value={user.user.identities[0].identity_data.email_verified}
            />
          </div>
        </div>
      </div>

      {/* <div className="">{userDetails?.email}I</div>
      <pre>{JSON.stringify(user, null, 2)}</pre> */}
    </div>
  );
};

export default ProfilePage;
