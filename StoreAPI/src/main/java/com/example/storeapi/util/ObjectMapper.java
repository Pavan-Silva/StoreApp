package com.example.storeapi.util;

import com.example.storeapi.dto.*;
import com.example.storeapi.model.Module;
import com.example.storeapi.model.*;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface ObjectMapper {

    ObjectMapper Map = Mappers.getMapper(ObjectMapper.class);

    UserDto userToDto(User user);

    User dtoToUser(UserDto userDto);

    AuthorityDto authorityToDto(Authority authority);

    Authority dtoToAuthority(AuthorityDto authorityDto);

    DesignationDto designationToDto(Designation designation);

    Designation dtoToDesignation(DesignationDto designationDto);

    EmployeeDto employeeToDto(Employee employee);

    Employee dtoToEmployee(EmployeeDto employeeDto);

    EmployeeStatusDto employeeStatusToDto(EmployeeStatus employeeStatus);

    EmployeeStatus dtoToEmployeeStatus(EmployeeStatusDto employeeStatusDto);

    GenderDto genderToDto(Gender gender);

    Gender dtoToGender(GenderDto genderDto);

    ModuleDto moduleToDto(Module module);

    Module dtoToModule(ModuleDto moduleDto);

    OperationDto operationToDto(Operation operation);

    Operation dtoToOperation(OperationDto operationDto);

    RoleDto roleToDto(Role role);

    Role dtoToRole(RoleDto roleDto);

    UserStatusDto userStatusToDto(UserStatus userStatus);

    UserStatus dtoToUserStatus(UserStatusDto userStatusDto);

    ItemDto itemToDto(Item item);

    Item dtoToItem(ItemDto itemDto);

    PurchaseOrderDto purchaseOrderToDto(PurchaseOrder purchaseOrder);

    PurchaseOrder dtoToPurchaseOrder(PurchaseOrderDto purchaseOrderDto);

    PorderStatusDto porderStatusToDto(PorderStatus porderStatus);

    PorderStatus dtoToPorderStatus(PorderStatusDto porderStatusDto);

    PorderItemDto porderItemToDto(PorderItem porderItem);

    PorderItem dtoToPorderItem(PorderItemDto porderItemDto);

    SupplierDto supplierToDto(Supplier supplier);

    Supplier dtoToSupplier(SupplierDto supplierDto);
}