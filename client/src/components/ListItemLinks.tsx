import { PropsDataLink } from "@/utils/data";
import { Box, Collapse, List, ListItemButton, ListItemText } from "@mui/material"
import { lightBlue } from "@mui/material/colors";
import { ChevronDown, ChevronUp } from "lucide-react"
import Link from "next/link";
import { useState } from "react";

interface PropsList{
  dataLink: PropsDataLink
}

export const ListItemLinks = ({ dataLink }: PropsList) => {
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
    <ListItemButton onClick={handleClick}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: "1rem" }}>
        <ListItemText primary={dataLink.tag} sx={{ fontWeight: 'bold' }} primaryTypographyProps={{ fontWeight: 'bold' }} />
          {open ? <ChevronUp size={20} color="gray"/> : <ChevronDown size={20} color="gray" />}
      </Box>
    </ListItemButton>
    <Collapse in={open} timeout="auto" unmountOnExit>
      <List component="div" disablePadding>
        {
          dataLink.blogs.map((blogs, index) => (
            <Link key={index} href={blogs.src}>
              <ListItemButton
                sx={{ pl: 4 }}
                key={index}
              >
                <ListItemText
                  primary={blogs.title}
                  primaryTypographyProps={{ fontSize: 14 }}
                />
              </ListItemButton>
            </Link>
          ))
        }
      </List>
    </Collapse>
    </>
  )
}
