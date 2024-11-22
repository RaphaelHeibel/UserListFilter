import { IFilterOptions } from "../interfaces/filter-options.interface";
import { IUser } from "../interfaces/user/user.interface";
import { isWithinInterval } from "date-fns";

const filterByName = (name: string | undefined, usersList: IUser[]): IUser[] => {
  const NAME_NOT_TYPPED = name === undefined;

  if (NAME_NOT_TYPPED)
    return usersList;

  const filteredList = usersList.filter((user) => user.nome.toLowerCase().includes(name.toLowerCase()));

  return filteredList;
}


const filterByStatus = (status: boolean | undefined, filteredList: IUser[]): IUser[] => {
  const STATUS_NOT_SELECTED = status === undefined;

  if (STATUS_NOT_SELECTED)
    return filteredList;

  const filteredListStatus = filteredList.filter((user) => user.ativo === status);

  return filteredListStatus;
}

const filterByDate = (startDate: Date | undefined, endDate: Date | undefined, userslist: IUser[]): IUser[] => {
  const DATES_NOT_SELECTED = startDate === undefined || endDate === undefined;

  if (DATES_NOT_SELECTED)
    return userslist;

  const listFiltered = userslist.filter((user) =>
    isWithinInterval(new Date(user.dataCadastro), { start: startDate, end: endDate }));

  return listFiltered;

}

const filterUsersList = (filterOptions: IFilterOptions, usersList: IUser[]): IUser[] => {
  let filteredList: IUser[] = [];

  filteredList = filterByName(filterOptions.name, usersList);
  filteredList = filterByStatus(filterOptions.status, filteredList);
  filteredList = filterByDate(filterOptions.startDate, filterOptions.endDate, filteredList);


  return filteredList;
}

export { filterUsersList };
