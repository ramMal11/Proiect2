const sequelize = require("../config/sequelize");
//const Op = sequelize.Op;
const { Op } = require("sequelize");

//Import models
const User = require("../models/user");
const Project = require("../models/project");
const Stage = require("../models/stage");
const Assessment = require('../models/assessment');
const { noExtendRight } = require("sequelize/dist/lib/operators");

//Define relationships between entities
User.belongsToMany(Project, { through: "enrollments" });
Project.belongsToMany(User, { through: "enrollments" });
Stage.belongsTo(Project, { through: "phases" });
Project.belongsToMany(Assessment, { through: "grades" });
Assessment.belongsToMany(Project, { through: "grades" });
Project.hasMany(Stage);

const router = require("express").Router();


router
    .route("/users")
    //GET all users
    .get(async (req, res) => {
        try {
            const user = await User.findAll();
            return res.status(200).json(user);
        } catch (err) {
            return res.status(500).json(err)
        }
    })
    //Create user
    .post(async (req, res) => {
        try {
            const newUser = await User.create(req.body);
            return res.status(200).json(newUser);
        } catch (err) {
            return res.status(500).json(err)
        }
    })

//GET existing user

router
    .route("/users/:userEmail/:userPassword")
    .get(async (req, res) => {
        const email = req.params.userEmail;
        const password = req.params.userPassword;
        try {
            const user = await User.findAll({
                where: {
                    userEmail: email,
                    userPassword: password
                }
            });
            if (user != '') {
                return res.status(200).json({ token: email });
            }
            else {
                return res.status(404).json({ error: "Invalid login!" })
            }
        } catch (err) {
            return res.status(500).json(err)
        }
    })
// router
//     .route("/users/:userEmail/:userPassword")
//     .get(async (req, res) => {
//         const email = req.params.userEmail;
//         const password = req.params.userPassword;
//         try {
//             const user = await User.findAll({
//                 where: {
//                     userEmail: email,
//                     userPassword: password
//                 }
//             });
//             if (user != '') {
//                 return res.status(200).json(user);
//             }
//             else {
//                 return res.status(404).json({ error: "Invalid login!" })
//             }
//         } catch (err) {
//             return res.status(500).json(err)
//         }
//     })

// Get projects of a student
router
    .get('/get/users/:userID/projects', async (req, res, next) => {
        try {
            const user = await User.findByPk(req.params.userID);
            if (user) {
                const projects = await user.getProjects();
                if (projects) {
                    return res.json(projects);
                } else {
                    return res.sendStatus(204);
                }
            } else {
                return res.sendStatus(404);
            }
        } catch (error) {
            next(error);
        }
    })

//Post student to a project
router
    .post('/project/:projectID/students/:userID', async (req, res, next) => {

        try {
            const project = await Project.findByPk(req.params.projectID);
            if (project) {
                const student = await User.findByPk(req.params.userID)
                project.addUsers(student);
                project.save();
                res.sendStatus(204);
            }
            else {
                res.sendStatus(404);
            }

        } catch (err) {
            return res.status(500).json(err);
        }
    })

// Post a new project
router
    .post('/projects', async (req, res) => {
        try {
            const newProject = await Project.create(req.body);
            return res.status(201).json(newProject);
        } catch (error) {
            return res.status(500).json(error);
        }
    })
//GET all projects
    .get('/projects', async (req, res, next) => {
        try {
            const proj = await Project.findAll();
            return res.status(201).json(proj);
        } catch (error) {
            next(error);
        }
    })

//POST stages to a project
router
    .post('/projects/:projectID/stage', async (req, res, next) => {
        try {
            const project = await Project.findByPk(req.params.projectID);
            if (project) {
                const stage = await Stage.create(req.body);
                project.addStage(stage);
                await project.save();
                res.status(201).location(stage.stageNumber).send();
            } else {
                res.sendStatus(404);
            }
        } catch (error) {
            next(error);
        }
    })

//GET project details by projectID for professor: evaluarea plus numele proiectului si al studentului - fara identitatea membrilor juriului
router
    .get('/projects/:projectID/professor', async (req, res, next) => {
        try {
            const projDetails = [];
            for (let stud of await User.findAll({
                include:{
                    model:Project,
                    through:{attributes:[]},
                    where: {projectID: req.params.projectID}
                }
            })){
                const student = {
                    firstName: stud.firstName,
                    lastName: stud.lastName,
                    project: [],
                    grade: []
                };
                for (let proj of await stud.getProjects()){
                    student.project.push({
                        projectName: proj.projectName
                    });
                    for(let asses of await proj.getAssessments()){
                        const grades = asses.grade;
                        student.grade.push({
                            grade: grades
                        })
                    }
                }
                projDetails.push(student);
            }
            //projDetails.push(student);
            res.json(projDetails);

        } catch (error) {
            next(error);
        }
    })


// POST evaluator to a project
router
    .post('/projects/:projectID/evaluators', async (req, res, next) => {
        try {
            const project = await Project.findByPk(req.params.projectID);
            if (project) {
                const studentsToProject =
                    //await project.getUsers({attributes: ["userID"], through: {attributes:[]}});
                    await Project.findAll({
                        include: [{
                            model: User,
                            attributes: ["userID"],
                            through: {
                                attributes: []
                            }
                        }],
                        where: {
                            projectID: req.params.projectID
                        }
                    })
                const result = studentsToProject.shift()
                const result2 = result.Users;
                const lista = [];
                for (var user of result2) {
                    lista.push(user.userID)
                }

                //res.json(lista); 
                console.log(lista)
                if (studentsToProject) {
                    // console.log("bla")

                    const evaluators = await User.findAll({
                        limit: 2,
                        where: {
                            userRole: 'S',
                            userID: { [Op.notIn]: lista }
                        },
                        attributes: ["userID"]
                    });

                    evaluatorsList = []
                    for (var evaluator of evaluators) {
                        evaluatorsList.push(evaluator.userID)
                    }

                    for (var element of evaluatorsList) {
                        const newAssessment = Assessment.create({ "evaluatorID": element })
                        project.addAssessment(element);
                    }
                    //res.json(evaluatorsList)
                    await project.save();
                    res.status(201).json({ message: "Evaluator has been assigned to the project!" });
                } else {
                    res.status(400).json({ message: "No student assigned to this project!" })
                }

            } else {
                res.status(404).json({ message: "404 - Project not found!" })
            }
        } catch (error) {
            next(error);
        }
    })


//PUT to update a grade
router
    .put('/projects/:projectID/grades/:evaluatorID', async (req, res, next) => {
        try {
            const project = await Project.findByPk(req.params.projectID);
            if (project) {
                const grades = await project.getAssessments({ evaluatorID: req.params.evaluatorID });
                const grade = grades.shift();
                const tt = await Assessment.update({ grade: req.body.grade }, { where: { evaluatorID: req.params.evaluatorID } });
                res.sendStatus(204);

            } else {
                res.sendStatus(404);
            }
        } catch (error) {
            next(error);
        }
    })



module.exports = router;