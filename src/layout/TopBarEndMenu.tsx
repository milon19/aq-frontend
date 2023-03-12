import React, {ReactComponentElement, useRef} from 'react';
import { Button } from 'primereact/button';
import { TieredMenu } from 'primereact/tieredmenu';
import { MenuItem } from 'primereact/menuitem';
import {Avatar} from "primereact/avatar";
import { useNavigate } from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {logout, selectAuth} from "../redux/slices/authSlices";
import {showToast} from "../services/toast";


export default function TopBarEndMenu() {
  const navigate = useNavigate();
  const menu = useRef<TieredMenu>(null);
  const dispatch = useAppDispatch();
  const items: MenuItem[] = [
    {
      label: 'Profile',
      icon: 'pi pi-fw pi-user',
    },
    {
      label: 'Users',
      icon: 'pi pi-fw pi-user',
      items: [
        {
          label: 'New',
          icon: 'pi pi-fw pi-user-plus'
        },
        {
          label: 'Delete',
          icon: 'pi pi-fw pi-user-minus'
        },
        {
          label: 'Search',
          icon: 'pi pi-fw pi-users',
          items: [
            {
              label: 'Filter',
              icon: 'pi pi-fw pi-filter',
              items: [
                {
                  label: 'Print',
                  icon: 'pi pi-fw pi-print'
                }
              ]
            },
            {
              icon: 'pi pi-fw pi-bars',
              label: 'List'
            }
          ]
        }
      ]
    },
    {
      separator: true
    },
    {
      label: 'Logout',
      icon: 'pi pi-fw pi-power-off',
      command(){
        dispatch(logout());
        showToast("success", "Logout successfully!")
      }
    }
  ];
  const {
    isAuthenticated,
  } = useAppSelector(selectAuth);
  if (isAuthenticated){
    return (
      <>
        <TieredMenu model={items} popup ref={menu}/>
        <Avatar label="V"
                style={{backgroundColor: '#2196F3', color: '#ffffff'}}
                shape="circle"
                onClick={(e) => menu.current?.toggle(e)}/>
      </>
    )
  } else {
    return(
      <>
        <Button icon="pi pi-sign-in" label="Login"
                style={{marginRight:10}}
                className="p-button-raised"
                onClick={() => navigate("/login")}
        />
        <Button icon="pi pi-user-plus" label="Register" className="p-button-success p-button-raised" />
      </>
    )
  }
}
