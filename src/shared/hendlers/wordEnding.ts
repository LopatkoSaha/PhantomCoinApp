function generateWordEnding({
  one,
  two,
  many,
}: {
  one: string;
  two: string;
  many: string;
}) {
  return function (num: number) {
    const absNum = Math.abs(num);
    const lastTwoDigits = absNum % 100;

    if (lastTwoDigits >= 10 && lastTwoDigits <= 19) {
      return `${num} ${many}`;
    }
    const lastDigit = absNum % 10;

    switch (lastDigit) {
      case 1:
        return `${num} ${one}`;
      case 2:
      case 3:
      case 4:
        return `${num} ${two}`;
      default:
        return `${num} ${many}`;
    }
  };
}

export const usersWordEnding = generateWordEnding({
  one: "пользователь",
  two: "пользователя",
  many: "пользователей",
});
