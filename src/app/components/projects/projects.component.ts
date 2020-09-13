import { Component, OnInit, Input, Renderer2} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Subject } from 'rxjs'
import { Utils } from '../../shared/utils/utils';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  projects: any[] = [
    {
      name: 'Nori Ray Tracer',
      description: 'Used C++, Monte Carlo Integration, and importance sampling, I extended the nori ray tracer base code to render images using Unidirectional/Bidirectional Ray Tracing techniques for diffuse and specular objects.',
      link: 'assets/CMSC740_FinalProject.pdf'
    },
    {
        name: 'GoalKeeper',
        description: 'Created a full stack web application that keeps tracks of goals and is also a social media platform using Python, Flask, SQLAlchemy, and Docker. Also, we incorporated a CI/CD pipeline using gitlab runners.',
        link: 'https://github.com/wongmaster3/GoalKeeper'
    },
    {
        name: 'Analyzing Citybike Data',
        description: 'In this project, we found, analyzed, and visualized NYC Citibike data to find the most dense source and destination stations, the different types of riders, and much more. We also created a model to predict the gender of the rider and performed cross validation on it. The technologies used were Python and its data science libraries (numpy, sklearn, etc.)',
        link: 'https://github.com/arunsrinivas20/arunsrinivas20.github.io'
    },
    {
      name: 'MeeshQuest',
      description: 'Developed a low-key MapQuest in one of my classes (CMSC420 Data Structures) using Java. Data Structures used were PR/PM-QuadTrees, and AVL Trees. Functionalities include finding nearest neighbor, nearest road, and more. The program takes in a XML file which then I have to parse and generate a map with the data. Feel free to contact me if you want to look at the code.'
    },
    {
        name: 'Personal Website',
        description: 'My own personal information website created using HTML, CSS, JS, Angular, and Bootstrap. Created from scratch, but some cool effects are taken from online and sourced appropriately. The website is updated annually.',
        link: 'https://github.com/wongmaster3/myinfopage'
    },
    {
      name: 'Measuring H20 Water Contamination',
      description: 'Here is one of the first projects I did at a Hackathon. Even though I was only a freshman at the time, it was a good learning experience as our team displayed water contamination data in different sectors of Maryland on a web app.',
      link: 'https://devpost.com/software/not-just-h2o#updatess'
    },
    {
      name: 'Betting Game',
      description: 'Here is one of the first projects I did in High School on \'scratch.mit\'. It is a game played by two people. Both players chooses an amount they would want to bet. A timer starts and the two people will need to try their luck on the timer.',
      link: 'https://scratch.mit.edu/projects/89911232/'
    }
];

  constructor(private renderer: Renderer2) {
   }

  ngOnInit() {
    
  }

  goToUrl(url: string) {
    Utils.goToUrl(url);
  }
}
