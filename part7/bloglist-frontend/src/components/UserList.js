import { useSelector } from 'react-redux'
import { Link as ReactLink } from 'react-router-dom'
import {
  Table,
  Link,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Heading
} from '@chakra-ui/react'

const UserList = () => {
  const users = useSelector(state => state.users)
  if (users.length === 0) {
    return (
      <div>
        <h1>users</h1>
        <p>no users found</p>
      </div>
    )
  }
  return (
    <div className='userlist'>
      <Heading as='h3' size='lg'>users</Heading>
      <TableContainer>
        <Table variant='striped' colorScheme='lightblue' size='sm' className='table-tiny'>
          <TableCaption>List of current users</TableCaption>
          <Thead>
            <Tr>
              <Th>username</Th>
              <Th>blogs created</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users.map(user =>
              <Tr key={user.id}>
                <Td>
                  <Link as={ReactLink} to={`/users/${user.id}`} color='aqua'>{user.username}</Link>
                </Td>
                <Td>
                  {user.blogs.length}
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </TableContainer>
    </div >
  )
}

export default UserList
