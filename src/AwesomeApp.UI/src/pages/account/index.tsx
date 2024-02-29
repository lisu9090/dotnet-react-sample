import { Typography } from "@mui/material";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { getSession } from "next-auth/react";
import { ReactElement } from "react";

export function getServerSideProps(context: GetServerSidePropsContext): GetServerSidePropsResult<{ }> {
  const session = getSession(context)

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
  }

  return {
    props: { }
  }
}

export default function Account(): ReactElement {
  return (
    <>
      <Typography variant="h5">Account Works!</Typography>
    </>
  )
}
