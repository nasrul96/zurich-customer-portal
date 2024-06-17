"use client";

import {
  fetchUsers,
  setPage,
  toggleEmail,
  usePage,
  useShowEmails,
  useTotalPages,
  useUsers,
} from "@root/store/slices/usersSlice";
import { Button, Table } from "flowbite-react";
import Image from "next/image";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export const UserListTable = () => {
  const dispatch = useDispatch();
  const users = useUsers();
  const showEmails = useShowEmails();
  const page = usePage();
  const totalPages = useTotalPages();

  useEffect(() => {
    dispatch(fetchUsers(page) as any);
  }, [page, dispatch]);

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      dispatch(setPage(newPage));
    }
  };

  return (
    <div className="overflow-x-auto">
      <Table hoverable className="bg-transparent">
        <Table.Head className="bg-transparent">
          <Table.HeadCell>Avatar</Table.HeadCell>
          <Table.HeadCell>Name</Table.HeadCell>
          <Table.HeadCell>Email</Table.HeadCell>
        </Table.Head>
        <Table.Body className="bg-transparent divide-y">
          {users.map((user) => (
            <Table.Row
              key={user.id}
              className="bg-transparent dark:border-gray-700 dark:bg-gray-800"
            >
              <Table.Cell className="w-1/5">
                <Image
                  src={user.avatar}
                  width={50}
                  height={50}
                  className="rounded-full"
                  alt="profile-picture"
                />
              </Table.Cell>
              <Table.Cell className="bg-transparent whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {user.first_name} {user.last_name}
              </Table.Cell>
              <Table.Cell className="w-3/5">
                <button onClick={() => dispatch(toggleEmail(user.id))}>
                  {showEmails[user.id] ? user.email : "Show Email"}
                </button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <div className="flex items-center justify-between mt-10">
        <Button
          color={page === 1 ? "gray" : "dark"}
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className="p-3"
        >
          Previous
        </Button>
        <span className="text-gray-800">
          Page {page} of {totalPages}
        </span>
        <Button
          color={page === totalPages ? "gray" : "dark"}
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
          className="p-3"
        >
          Next
        </Button>
      </div>
    </div>
  );
};
