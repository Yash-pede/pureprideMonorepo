"use client";
import { columns } from "./Columns";
import { DataTable } from "./data-table";
import axios from "axios";
import { useEffect, useState } from "react";

export default function DemoPage() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    async function getData(){
      const usersData = await axios.get("/api/users");
      setUsers(usersData.data.users);
    }
    getData();
  }, []);
  const data = users;

  return (
    <div className="w-full py-10">
      <h1 className="text-4xl font-bold mb-5 text-left">List of all Users</h1>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
