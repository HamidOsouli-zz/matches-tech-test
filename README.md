<h1 align="center">
Top Words Occurring
</h1>
Find Top occurred words in a string.

## 💡 Features

- Built with Typescript and Node.js to find the most ``3`` (`n for general case`) occurring words in a text
- Input is streamed in so that large texts can be processed without a memory overhead
- A word consists of `a-zA-Z` or `'` or `space` so everything else must be removed
- A hashTable is created with (`word` → `number of occurrences`)
- Calculates the function based on the input from `input.txt`
- Unit tested

## 🛠️ Usage Steps

1. Clone the repository

```bash
git clone https://github.com/HamidOsouli/matches-tech-test.git
```

2. Change the working directory

```bash
cd matches-tech-test
```

3. Install dependencies

```bash
yarn or npm install
```

4. put your text in `input.txt` or use the default text

```bash
echo 'this is a sample test' > input.txt
```

5. Run the app

```bash
yarn dev
```
6. Build the app for production

```bash
yarn start:production
```

## ⌛️ Metrics
```
Time execution table for M1 macbook pro 💻

```
| Number of Lines        | Execution Time           |
| ------------- |:-------------:|
| 7     | 3.123ms |
| 1,000     | 10.232ms |
| 500,000     | 1.191s    |
| 1,000,000 | 2.265s      |
```
```

🌟 You are all set!

## 💻 Built with

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)
- Node.js 
- Typescript
- Jest
- Nodemon