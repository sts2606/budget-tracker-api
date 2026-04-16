import jwt from 'jsonwebtoken';
import User from '../schemas/users.js';

const secretKey = process.env.SECRET_KEY || 'mysecretkey';

export const getUsersHandler = async (request, response, next) => {
  const params = request.query;
  const page = parseInt(params.page, 10) || 1;
  const limit = parseInt(params.limit, 10) || 5;

  const totalUsers = await User.countDocuments({});
  const totalPages = Math.ceil(totalUsers / limit);

  console.log('Total users:', totalUsers, 'Total pages:', totalPages);

  const query = {
    currency: 'USD',
  };

  const projection = {
    projection: {
      _id: 0,
      name: 1,
      email: 1,
      limit: 1,
      currency: 1,
    },
  };

  const users = await usersCollection
    .find(query, projection)
    .sort({ limit: 1 })
    .limit(limit)
    .skip((page - 1) * limit)
    .toArray();

  response.status(200).send({ users });
};

export const getUsersSummaryHandler = async (_request, response, next) => {
  await User.createIndexes({ limit: 1 });

  // const currencyAggregationOption = {
  //   $group: {
  //     _id: '$currency',
  //     totalLimit: { $sum: '$limit' },
  //     averageLimit: { $avg: '$limit' },
  //     total: { $sum: 1 },
  //   },
  // };

  // const result = await usersCollection
  //   .aggregate([
  //     {
  //       $match: {
  //         currency: { $in: ['USD', 'EUR'] },
  //       },
  //       $sort: {
  //         limit: 1,
  //       },
  //       $group: {
  //         _id: '$currency',
  //         totalLimit: { $sum: '$limit' },
  //       },
  //     },
  //   ])
  //   .toArray();

  await User.createIndexes({ 'skills.backend': 1 }, { sparse: true });

  response.status(200).send({ result: 'Summary data' });
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

export const putUserByEmailHandler = async (request, response) => {
  const email = request.params.email || 'Unknown User';
  const body = request.body;

  const query = { email };
  const update = { $set: { name: body.name } };

  const result = await User.findOneAndUpdate(query, update, {
    runValidators: true,
  });

  if (result.matchedCount === 0) {
    return response.status(404).send('User not found');
  }

  response.status(200).send({ message: 'User updated successfully' });
};

export const postUsersHandler = async (request, response) => {
  const { email, password, ...rest } = request.body;

  const token = jwt.sign({ email, password }, secretKey, {
    expiresIn: '1h',
    algorithm: 'HS512',
  });

  const dataToInsert = { ...rest, email, token };

  const result = await User.insertOne(dataToInsert);

  response.cookie('token', token, {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
  });

  response
    .status(201)
    .send({ message: 'New user has been created', user: result.insertedId });
};

// no token in cookies
// export const postUsersHandler = (request, response) => {
//   const users = fs.readFileSync(join(__dirname, 'data/users.json'));
//   const { email, password, ...rest } = request.body;

//   const parsedUsers = JSON.parse(users);
//   const isUsersExist =
//     Array.isArray(parsedUsers) &&
//     parsedUsers.findIndex((user) => user.email === email) >= 0;

//   if (isUsersExist) {
//     response.status(409).send('User with such email already exist');
//   }

//   const token = jwt.sign({ email, password }, secretKey, {
//     expiresIn: '1h',
//     algorithm: 'HS512',
//   });

//   const newUserData = { id: uuidv4(), email, token, ...rest };

//   const newUsers = [...parsedUsers, newUserData];

//   fs.writeFileSync(
//     join(__dirname, 'data/users.json'),
//     JSON.stringify(newUsers),
//   );

//   response
//     .status(201)
//     .send({ message: 'New user has been created', user: newUserData });
// };
