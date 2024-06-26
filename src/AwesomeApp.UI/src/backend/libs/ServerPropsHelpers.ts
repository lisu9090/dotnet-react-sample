export const resultProps = <T>(props?: T) => ({
  props: props ?? { } as T
})

export const resultRedirect = (destination: string) => ({
  redirect: {
    destination: destination,
    permanent: false,
  }
})
