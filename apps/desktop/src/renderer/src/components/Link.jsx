import { forwardRef } from 'react'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import NextLink from 'next/link'
import MuiLink from '@mui/material/Link'

const NextComposed = forwardRef(function NextComposed(props, ref) {
  const { as, href, ...other } = props

  return (
    <NextLink href={href} as={as}>
      <a ref={ref} {...other} />
    </NextLink>
  )
})

function Link(props) {
  const {
    href,
    activeClassName = 'active',
    className: classNameProps,
    innerRef,
    naked,
    ...other
  } = props

  const router = useRouter()
  const pathname = typeof href === 'string' ? href : href.pathname
  const className = clsx(classNameProps, {
    [activeClassName]: router.pathname === pathname && activeClassName
  })

  if (naked) {
    return <NextComposed className={className} ref={innerRef} href={href} {...other} />
  }

  return (
    <MuiLink
      component={NextComposed}
      className={className}
      ref={innerRef}
      href={href}
      {...other}
      underline="hover"
    />
  )
}

export default forwardRef((props, ref) => <Link {...props} innerRef={ref} />)
