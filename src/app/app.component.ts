import { Component, OnInit } from '@angular/core';
import { IUser } from './interfaces/user/user.interface';
import { UsersList } from './data/users-list';
import { IFilterOptions } from './interfaces/filter-options.interface';
import { IStatus } from './interfaces/user/status.interface';
import { isWithinInterval } from 'date-fns';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  usersList: IUser[] = [];
  userListFiltered: IUser[] = [];
  userSelected: IUser = {} as IUser;
  showUserDetails: boolean = false;

  ngOnInit() {
    setTimeout(() => {
      this.usersList = UsersList;
      this.userListFiltered = this.usersList;
    }, 1);

  }

  onUserSelected(user: IUser) {
    this.userSelected = user;
    this.showUserDetails = true;
  }

  onFilter(filterOptions: IFilterOptions) {
    this.userListFiltered = this.filterUsersList(filterOptions, this.usersList);
  }
  filterUsersList(filterOptions: IFilterOptions, usersList: IUser[]): IUser[] {
    let filteredList: IUser[] = [];

    filteredList = this.filterByName(filterOptions.name, usersList);
    filteredList = this.filterByStatus(filterOptions.status, filteredList);
    filteredList = this.filterByDate(filterOptions.startDate, filterOptions.endDate, filteredList);


    return filteredList;
  }

  filterByDate(startDate: Date | undefined, endDate: Date | undefined, userslist: IUser[]): IUser[] {
    const DATES_NOT_SELECTED = startDate === undefined || endDate === undefined;

    if (DATES_NOT_SELECTED)
      return userslist;

    const listFiltered = userslist.filter((user) =>
      isWithinInterval(new Date(user.dataCadastro), { start: startDate, end: endDate }));

    return listFiltered;

  }

  filterByStatus(status: boolean | undefined, filteredList: IUser[]): IUser[] {
    const STATUS_NOT_SELECTED = status === undefined;

    if (STATUS_NOT_SELECTED)
      return filteredList;

    const filteredListStatus = filteredList.filter((user) => user.ativo === status);

    return filteredListStatus;
  }

  filterByName(name: string | undefined, usersList: IUser[]): IUser[] {
    const NAME_NOT_TYPPED = name === undefined;

    if (NAME_NOT_TYPPED)
      return usersList;

    const filteredList = usersList.filter((user) => user.nome.toLowerCase().includes(name.toLowerCase()));

    return filteredList;
  }
}
