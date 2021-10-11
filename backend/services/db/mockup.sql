INSERT INTO selcrumdb.projects(name, info, start_date, end_date) VALUES("name1", "info1", "2021-09-19", "2021-10-10");
INSERT INTO selcrumdb.projects(name, info, start_date, end_date) VALUES("name2", "info2", "2021-09-19", "2021-10-10");
INSERT INTO selcrumdb.projects(name, info, start_date, end_date) VALUES("name3", "info3", "2021-09-19", "2021-10-10");
INSERT INTO selcrumdb.projects(name, info, start_date, end_date) VALUES("name4", "info4", "2021-09-19", "2021-10-10");
INSERT INTO selcrumdb.projects(name, info, start_date, end_date) VALUES("name5", "info5", "2021-09-19", "2021-10-10");
INSERT INTO selcrumdb.projects(name, info, start_date, end_date) VALUES("name6", "info6", "2021-09-19", "2021-10-10");

INSERT INTO selcrumdb.sprints(project_id, name, start_date, end_date) VALUES(1, "sprint1", "2021-09-19", "2021-09-26");
INSERT INTO selcrumdb.sprints(project_id, name, start_date, end_date) VALUES(1, "sprint2", "2021-09-19", "2021-09-26");
INSERT INTO selcrumdb.sprints(project_id, name, start_date, end_date) VALUES(1, "sprint3", "2021-09-19", "2021-09-26");
INSERT INTO selcrumdb.sprints(project_id, name, start_date, end_date) VALUES(1, "sprint4", "2021-09-19", "2021-09-26");
INSERT INTO selcrumdb.sprints(project_id, name, start_date, end_date) VALUES(2, "sprint5", "2021-09-19", "2021-09-26");
INSERT INTO selcrumdb.sprints(project_id, name, start_date, end_date) VALUES(2, "sprint6", "2021-09-19", "2021-09-26");
INSERT INTO selcrumdb.sprints(project_id, name, start_date, end_date) VALUES(3, "sprint7", "2021-09-19", "2021-09-26");
INSERT INTO selcrumdb.sprints(project_id, name, start_date, end_date) VALUES(4, "sprint8", "2021-09-19", "2021-09-26");

INSERT INTO selcrumdb.tasks(project_id, task, todo) VALUES(1, "task1", 1);
INSERT INTO selcrumdb.tasks(project_id, task, todo) VALUES(1, "task2", 1);
INSERT INTO selcrumdb.tasks(project_id, task, todo) VALUES(1, "task3", 2);
INSERT INTO selcrumdb.tasks(project_id, task, todo) VALUES(1, "task4", 3);
INSERT INTO selcrumdb.tasks(project_id, task, todo) VALUES(2, "task5", 2);
INSERT INTO selcrumdb.tasks(project_id, task, todo) VALUES(2, "task6", 3);
INSERT INTO selcrumdb.tasks(project_id, task, todo) VALUES(3, "task7", 1);
INSERT INTO selcrumdb.tasks(project_id, task, todo) VALUES(3, "task8", 1);
INSERT INTO selcrumdb.tasks(project_id, task, todo) VALUES(4, "task9", 1);
INSERT INTO selcrumdb.tasks(project_id, task, todo) VALUES(5, "task10", 1);
INSERT INTO selcrumdb.tasks(project_id, task, todo) VALUES(6, "task11", 1);

INSERT INTO selcrumdb.task_sprint(task_id, sprint_id) VALUES(1, 3);
INSERT INTO selcrumdb.task_sprint(task_id, sprint_id) VALUES(2, 3);
INSERT INTO selcrumdb.task_sprint(task_id, sprint_id) VALUES(3, 3);
INSERT INTO selcrumdb.task_sprint(task_id, sprint_id) VALUES(4, 3);
INSERT INTO selcrumdb.task_sprint(task_id, sprint_id) VALUES(5, 7);
INSERT INTO selcrumdb.task_sprint(task_id, sprint_id) VALUES(6, 7);
INSERT INTO selcrumdb.task_sprint(task_id, sprint_id) VALUES(7, 9);
INSERT INTO selcrumdb.task_sprint(task_id, sprint_id) VALUES(8, 9);
INSERT INTO selcrumdb.task_sprint(task_id, sprint_id) VALUES(9, 10);

insert into selcrumdb.user_project values ("test1", 1);
insert into selcrumdb.user_project values ("test1", 2);
insert into selcrumdb.user_project values ("test1", 3);
insert into selcrumdb.user_project values ("test1", 4);
insert into selcrumdb.user_project values ("test1", 5);
insert into selcrumdb.user_project values ("test1", 6);