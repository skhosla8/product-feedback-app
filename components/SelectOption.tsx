// Base Imports
import React, { FC, Dispatch, SetStateAction } from "react";
// Components 
import Image from 'next/image';
// Icons/Images
import iconCheck from "../assets/icon-check.svg";
import { Select } from "@nextui-org/react";

interface SelectOptionProps {
  i: number;
  title: string;
  selectedCategory?: string;
  setSelectedCategory?: Dispatch<SetStateAction<string>>;
  selectedStatus?: string,
  setSelectedStatus?: Dispatch<SetStateAction<string>>,
  isOpenEditForm?: boolean,
  setIsOpenCategorySelect: Dispatch<SetStateAction<boolean>>,
  setIsOpenStatusSelect?: Dispatch<SetStateAction<boolean>>,
}

const SelectOption: FC<SelectOptionProps> = ({
  i,
  title,
  selectedCategory,
  setSelectedCategory,
  selectedStatus,
  setSelectedStatus,
  isOpenEditForm,
  setIsOpenCategorySelect,
  setIsOpenStatusSelect
}) => {
  const handleSelection = () => {
    isOpenEditForm ? setSelectedStatus!(title) : setSelectedCategory!(title);

    setIsOpenCategorySelect(false);

    isOpenEditForm && setIsOpenStatusSelect!(false);
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "white",
        borderBottom: "1px solid rgba(0,0,0,0.2)",
        padding: "0.6rem 1.1rem",
        borderTopLeftRadius: i === 0 ? "12px" : "",
        borderTopRightRadius: i === 0 ? "12px" : "",
        borderBottomLeftRadius: i === 4 ? "12px" : "",
        borderBottomRightRadius: i === 4 ? "12px" : "",
        cursor: "pointer",
      }}
      onClick={handleSelection}
    >
      <span
        style={{
          color: "#647196",
          fontFamily: "Arial",
          fontSize: "0.8rem",
        }}
      >
        {title}
      </span>
      {
        (title === selectedCategory || title === selectedStatus) &&
        <Image
          src={iconCheck}
          alt='icon-check'
        />
      }
    </div>
  );
};

export default SelectOption;
