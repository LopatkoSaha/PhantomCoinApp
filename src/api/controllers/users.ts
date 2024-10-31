// import "shared/assets/db/db";

let dbUsers = [
  {
    id: "46546546544",
    name: "saha",
    email: "saha@gmail.com",
    password: "111111",
  },
];
//  window.db?.users || [];

export const getUser = (
  query: Record<string, any>,
  body: Record<string, any>
): Promise<any> => {
  const { email, password } = body;

  const user = dbUsers.find((item) => {
    return item.email === email && item.password === password;
  });
  if (user) {
    const req = {
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      status: 200,
      statusText: "OK",
    };
    return Promise.resolve(JSON.stringify(req));
  } else
    return Promise.resolve(
      JSON.stringify({ status: 500, statusText: "ERROR" })
    );
};

export const createUser = (
  query: Record<string, any>,
  body: Record<string, any>
) => {
  const { name, email, password } = body;

  const user = dbUsers.find((item) => {
    return item.email === email;
  });
  if (user) {
    return Promise.resolve(
      JSON.stringify({ status: 500, statusText: "ERROR" })
    );
  } else {
    const id: string = Date.now().toString();
    dbUsers.push({ id, name, email, password });
    const user = dbUsers.find((item) => {
      return item.email === email && item.password === password;
    });
    const req = {
      data: {
        id: user?.id,
        name: user?.name,
        email: user?.email,
      },
      status: 200,
      statusText: "OK",
    };

    return Promise.resolve(JSON.stringify(req));
  }
};

export const deleteUser = (
  query: Record<string, any>,
  body: Record<string, any>
) => {
  const { name, email } = body;

  const user = dbUsers.find((item) => {
    return item.email === email;
  });

  if (!user) {
    return Promise.resolve(
      JSON.stringify({ status: 500, statusText: "ERROR" })
    );
  }
  if (user) {
    dbUsers = dbUsers.filter((item) => item.id !== user?.id); // Придумать как мутировать импортированный массив db
    const deletedUser = dbUsers.find((item) => {
      return item.email === email;
    });
    if (!deletedUser) {
      const req = {
        data: {
          name: user?.name,
          email: user?.email,
        },
        status: 200,
        statusText: "OK",
      };
      return Promise.resolve(JSON.stringify(req));
    }
    if (deletedUser) {
      return Promise.resolve(
        JSON.stringify({ status: 500, statusText: "ERROR" })
      );
    }
  }
};

export const getAllUsers = (): Promise<any> => {
  if (dbUsers.length) {
    const req = {
      data: dbUsers,
      status: 200,
      statusText: "OK",
    };
    return Promise.resolve(JSON.stringify(req));
  } else {
    const req = {
      data: dbUsers,
      status: 500,
      statusText: "ERROR",
    };
    return Promise.resolve(JSON.stringify(req));
  }
};
