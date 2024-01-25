package com.example.storeapi.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "employee")
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "emp_no", length = 7)
    private String empNo;

    @Column(name = "full_name", length = 150)
    private String fullName;

    @Column(name = "calling_name", length = 45)
    private String callingName;

    @Column(name = "photo")
    private byte[] photo;

    @ManyToOne(optional = false)
    @JoinColumn(name = "gender_id", nullable = false)
    private Gender gender;

    @Column(name = "dobirth")
    private LocalDate doBirth;

    @Column(name = "nic", length = 12)
    private String nic;

    @Lob
    @Column(name = "address")
    private String address;

    @Column(name = "mobile", length = 10)
    private String mobile;

    @Column(name = "land", length = 10)
    private String land;

    @Column(name = "doassignment")
    private LocalDate doAssignment;

    @ManyToOne(optional = false)
    @JoinColumn(name = "designation_id", nullable = false)
    private Designation designation;

    @ManyToOne(optional = false)
    @JoinColumn(name = "employeestatus_id", nullable = false)
    private EmployeeStatus employeeStatus;

    @Lob
    @Column(name = "description")
    private String description;
}