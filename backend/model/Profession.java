/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package model;

/**
 *
 * @author IQMAL
 */
public class Profession {
    private int professionID;
    private String professionName;
    private String description;
     private String category;
    
//Getter and Setter
public int getProfessionID(){
    return professionID;
}

public String getProfessionName(){
    return professionName;
}

public String getDescription(){
    return description;
}

public String getCategory(){
    return category;
}

public void setProfessionID(int professionID){
    this.professionID = professionID;
}

public void setProfessionName(String professionName){
    this.professionName = professionName;
}
public void setDescription(String description){
    this.description = description;
}
public void setCategory(String category){
    this.category = category;
}
}
