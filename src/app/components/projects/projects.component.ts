import { Component } from '@angular/core';
import { Utils } from '../../shared/utils/utils';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent {
  projects: any[] = [
    {
      name: 'SharedSpace',
      description: 'Used angular, node, socket.io, and mediasoup to develop a video conferencing system with spatial audio and video formats. Worked on this during my Masters at the University of Maryland College Park and a bit after during my time at VisiSonics.',
      paper: 'assets/sharedspace_paper.pdf',
      demo: 'https://realrooms.visisonics.com'
    },
    {
      name: 'Measuring IOT Speaker Misactivations',
      description: 'A security project accessing the risk of IOT speaker misactivations when different accents are used (American, Indian, and British accents). Data was collected and analyzed with an Amazon Echo Dot and Google Home Mini.',
      code: 'https://github.com/wongmaster3/Speaker-Misactivations',
      paper: 'assets/CMSC614_Speaker_Misactivations.pdf'
    },
    {
      name: 'Nori Ray Tracer',
      description: 'Used C++, Monte Carlo Integration, and importance sampling, I extended the nori ray tracer base code to render images using Unidirectional/Bidirectional Ray Tracing techniques for diffuse and specular objects.',
      paper: 'assets/CMSC740_FinalProject.pdf'
    },
    {
        name: 'GoalKeeper',
        description: 'Created a full stack web application that keeps tracks of goals and is also a social media platform using Python, Flask, SQLAlchemy, and Docker. Also, we incorporated a CI/CD pipeline using gitlab runners.',
        code: 'https://github.com/wongmaster3/GoalKeeper'
    },
    {
        name: 'Analyzing Citybike Data',
        description: 'In this project, we found, analyzed, and visualized NYC Citibike data to find the most dense source and destination stations, the different types of riders, and much more. We also created a model to predict the gender of the rider and performed cross validation on it. The technologies used were Python and its data science libraries (numpy, sklearn, etc.)',
        code: 'https://github.com/arunsrinivas20/arunsrinivas20.github.io'
    },
    {
      name: 'MeeshQuest',
      description: 'Developed a low-key MapQuest in one of my classes (CMSC420 Data Structures) using Java. Data Structures used were PR/PM-QuadTrees, and AVL Trees. Functionalities include finding nearest neighbor, nearest road, and more. The program takes in a XML file which then I have to parse and generate a map with the data. Feel free to contact me if you want to look at the code.'
    },
    {
        name: 'Personal Website',
        description: 'My own personal information website created using HTML, CSS, JS, and Angular. The website is updated annually.',
        code: 'https://github.com/wongmaster3/myinfopage'
    },
    {
      name: 'Measuring H20 Water Contamination',
      description: 'Here is one of the first projects I did at a Hackathon. Even though I was only a freshman at the time, it was a good learning experience as our team displayed water contamination data in different sectors of Maryland on a web app.',
      article: 'https://devpost.com/software/not-just-h2o#updatess'
    },
    {
      name: 'Betting Game',
      description: 'Here is one of the first projects I did in High School on \'scratch.mit\'. It is a game played by two people. Both players chooses an amount they would want to bet. A timer starts and the two people will need to try their luck on the timer.',
      demo: 'https://scratch.mit.edu/projects/89911232/'
    }
];

  constructor() {}

  goToUrl(url: string) {
    Utils.goToUrl(url);
  }
}
