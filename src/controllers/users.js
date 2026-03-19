import { users as mockUsers } from '../mocks/users.js';

export const getUsersHandler = (request, response) => {
  const data = {
    users: mockUsers,
    pageTitle: 'Test users',
    title: 'Users test title',
  };

  response.render('users', data);
};

export const getUserByIdHandler = (request, response) => {
  const userId = request.params.userId || 'Unknown User';
  response.end(`Get Users By ID Handler. User ID: ${userId}`);
};

export const deleteUserByIdHandler = (request, response) => {
  const userId = request.params.userId || 'Unknown User';
  response.end(`Delete Users By ID Handler. User ID: ${userId}`);
};

export const putUserByIdHandler = (request, response) => {
  const userId = request.params.userId || 'Unknown User';
  response.end(`Put Users By ID Handler. User ID: ${userId}`);
};

export const postUsersHandler = (request, response) => {
  const body = request.body;
  console.log('Body from postUsersHandler', request.body);

  response.end(`Post Users Handler ${JSON.stringify(body)}`);
};
