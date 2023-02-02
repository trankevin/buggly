import DatabaseService from "services/DatabaseService";
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function ProjectFormSelect({ handleChange, defaultProject = '' }) {
    
    const projects = useSelector(state => state.myProjects);

    return(
        <Form.Select  aria-label="Project Select" name="projectID" value={defaultProject} onChange={handleChange} required>
             <option value="">Select Project</option>
            
            {projects.map((project) => {
                return(
                    <option key={project.id} value={project.id}>{project.projectName}</option>
                );
            })}
            
        </Form.Select>
    );
}