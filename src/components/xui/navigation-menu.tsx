import {
    NavigationMenuLinkProps,
    NavigationMenuTriggerProps,
} from "@radix-ui/react-navigation-menu"

import {
    NavigationMenuLink,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "../ui/navigation-menu"

export const NzNavigationMenuLink = (
    props: NavigationMenuLinkProps & React.RefAttributes<HTMLAnchorElement>,
) => {
    return (
        <NavigationMenuLink
            {...props}
            className={
                navigationMenuTriggerStyle() +
                " hover:bg-inherit data-[active]:bg-inherit transition-colors text-foreground/60 data-[active]:text-foreground hover:text-foreground/90"
            }
        />
    )
}

export const NzNavigationMenuTrigger = (
    props: Omit<NavigationMenuTriggerProps & React.RefAttributes<HTMLButtonElement>, "ref"> &
        React.RefAttributes<HTMLButtonElement>,
) => {
    return (
        <NavigationMenuTrigger
            {...props}
            className={
                navigationMenuTriggerStyle() +
                " hover:bg-inherit data-[active]:bg-inherit transition-colors text-foreground/60 data-[active]:text-foreground hover:text-foreground/90"
            }
        />
    )
}
