import { Typography } from "@mui/material";

export default function Account() {
  return (
    <>
      <Typography variant="h5">Account Works!</Typography>
    </>
  )
}

// type StaticProps = {
//   props : {
//     title: string;
//   };
// }

// export async function getStaticProps({ params }: any): Promise<StaticProps> {
//   return new Promise<StaticProps>(
//     (resolve) => resolve({
//       props: {
//         title: 'Test static props ' + params?.something
//       }
//     })
//   )
// }

// export async function getStaticPaths(): Promise<GetStaticPathsResult> {
//   return {
//     paths: [
//       {
//         params: {
//           something: 'test'
//         }
//       },
//       {
//         params: {
//           something: 'test2'
//         }
//       }
//     ],
//     fallback: false
//   }
// }

// type ServerSideProps = {
//   props: {
//     id: number;
//   };
// }

// export async function getServerSideProps(): Promise<ServerSideProps> {
//   return new Promise(
//     (resolve) => resolve({
//       props: {
//         id: Math.random() * 100
//       }
//     })
//   )
// }