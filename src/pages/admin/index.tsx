import React, { useState } from 'react'
import { Avatar, Button, Checkbox, Dropdown, Navbar, Sidebar, Table } from 'flowbite-react'
import { Link } from 'react-router-dom'
import { HiOutlineMenuAlt1 } from 'react-icons/hi'
import { FaRegEdit } from 'react-icons/fa'
import { RiDeleteBinLine } from 'react-icons/ri'

const AdminPage = () => {
  const [isExpand, setIsExpand] = useState(true)
  return (
    <>
      <Navbar
        fluid
        rounded
        className='fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700'
      >
        <Navbar.Brand as={Link} href='https://flowbite-react.com'>
          <HiOutlineMenuAlt1 className='h-6 w-6 mx-4' onClick={() => setIsExpand((prev) => !prev)} />
          <span className='self-center whitespace-nowrap text-xl font-semibold dark:text-white'>Flowbite React</span>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Dropdown
            label={
              <Avatar
                alt='User settings'
                img='https://cdn.tuoitre.vn/2019/5/8/avatar-publicitystill-h2019-1557284559744252594756.jpg'
                rounded
              />
            }
            arrowIcon={false}
            inline
          >
            <Dropdown.Header>
              <span className='block text-sm'>Gmail</span>
              <span className='block truncate text-sm font-medium'>gmail@gmail.com</span>
            </Dropdown.Header>
            <Dropdown.Divider />
            <Dropdown.Item as={Link} to='/'>
              Sign out
            </Dropdown.Item>
          </Dropdown>
        </Navbar.Collapse>
      </Navbar>

      <Sidebar
        aria-label='Default sidebar example'
        className={`fixed top-0 left-0 z-40 h-screen pt-12 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700 ${
          isExpand ? 'w-64' : 'w-12'
        }`}
      >
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Item href='#'>Users</Sidebar.Item>
            <Sidebar.Item href='#'>Questions</Sidebar.Item>
            <Sidebar.Item href='#'>Posts</Sidebar.Item>
            <Sidebar.Item href='#'>Bookings</Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>

      <div className={`p-4 ${isExpand ? 'sm:ml-64' : 'sm:ml-12'}`}>
        <div className='p-4 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14'>
          <div className='overflow-x-auto'>
            <Table hoverable>
              <Table.Head>
                <Table.HeadCell>
                  <Checkbox />
                </Table.HeadCell>
                <Table.HeadCell>Name</Table.HeadCell>
                <Table.HeadCell>Position</Table.HeadCell>
                <Table.HeadCell>Status</Table.HeadCell>
                <Table.HeadCell>
                  <span className='sr-only'>Actions</span>
                </Table.HeadCell>
              </Table.Head>

              <Table.Body className='divide-y'>
                <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                  <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
                    <Checkbox />
                  </Table.Cell>
                  <Table.Cell>Name</Table.Cell>
                  <Table.Cell>Laptop</Table.Cell>
                  <Table.Cell>Active</Table.Cell>
                  <Table.Cell className='flex gap-3'>
                    <Button size='xs'>
                      <FaRegEdit className='mr-2 h-5 w-5' />
                      Edit user
                    </Button>

                    <Button color='failure' size='xs'>
                      <RiDeleteBinLine className='mr-2 h-5 w-5' />
                      Delete user
                    </Button>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminPage
