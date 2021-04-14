import chai from "chai";
import { waffle, ethers } from "hardhat";
import { fixtureDeployedSocialStarter, fixtureProjectCreatedBuilder } from "./common-fixtures";

const { loadFixture } = waffle;

const { expect } = chai;

describe("SocialStarter - Creation of project", () => {
  describe("GIVEN a social starter is deployed", () => {
    const stagesCost = [15];
    describe(`WHEN a project is created with only a stage with a cost of ${stagesCost[0]}`, function () {
      before(async function () {
        const { projectCreationTx, socialStarter, projectOwner, projectReviewer, projectId } = await loadFixture(
          fixtureProjectCreatedBuilder(stagesCost),
        );
        this.projectCreationTx = projectCreationTx;
        this.socialStarter = socialStarter;
        this.projectOwner = projectOwner;
        this.projectReviewer = projectReviewer;
        this.projectId = projectId;
      });
      it("THEN an event is emited", async function () {
        return expect(await this.projectCreationTx)
          .to.emit(this.socialStarter, "ProjectCreated")
          .withArgs(this.projectId, this.projectOwner.address, this.projectReviewer.address, stagesCost[0]);
      });

      it(`THEN the project has a missing amount of ${stagesCost[0]}`, async function () {
        return expect((await this.socialStarter.projects(this.projectId)).missingAmount).to.equal(stagesCost[0]);
      });

      it(`THEN the project has the right reviewer`, async function () {
        return expect((await this.socialStarter.projects(this.projectId)).reviewer).to.equal(
          this.projectReviewer.address,
        );
      });
      it(`THEN the project has the right owner`, async function () {
        return expect((await this.socialStarter.projects(this.projectId)).owner).to.equal(this.projectOwner.address);
      });
      it(`THEN the project is at the FUNDING state`, async function () {
        return expect((await this.socialStarter.projects(this.projectId)).state).to.equal(0);
      });
    });
  });

  describe("GIVEN a social starter is deployed", () => {
    const stagesCost = [10, 20, 30000];
    const summedCost = stagesCost.reduce((acc, curr) => acc + curr);
    describe(`WHEN a project is created with three stages`, function () {
      before(async function () {
        const { projectCreationTx, socialStarter, projectOwner, projectReviewer, projectId } = await loadFixture(
          fixtureProjectCreatedBuilder(stagesCost),
        );
        this.projectCreationTx = projectCreationTx;
        this.socialStarter = socialStarter;
        this.projectOwner = projectOwner;
        this.projectReviewer = projectReviewer;
        this.projectId = projectId;
      });
      it("THEN an event is emited", async function () {
        return expect(await this.projectCreationTx)
          .to.emit(this.socialStarter, "ProjectCreated")
          .withArgs(this.projectId, this.projectOwner.address, this.projectReviewer.address, summedCost);
      });

      it(`THEN the project has a missing amount equal to the sum of the cost of the stages`, async function () {
        return expect((await this.socialStarter.projects(this.projectId)).missingAmount).to.equal(summedCost);
      });
    });
  });
  describe("GIVEN a social starter is deployed", () => {
    describe("WHEN a project tries to be created by a non owner", function () {
      it("THEN th tx reverts", async function () {
        const socialStarter = await loadFixture(fixtureDeployedSocialStarter);
        return expect(
          socialStarter
            .connect((await ethers.getSigners())[1])
            .createProject(
              [10],
              "0x0000000000000000000000000000000000000000",
              "0x0000000000000000000000000000000000000000",
            ),
        ).to.be.revertedWith("Ownable: caller is not the owner");
      });
    });
  });
  describe("GIVEN a social starter is deployed", () => {
    describe("WHEN a project tries to be created without any stage", function () {
      it("THEN th tx reverts", async function () {
        const socialStarter = await loadFixture(fixtureDeployedSocialStarter);
        return expect(
          socialStarter.createProject(
            [],
            "0x0000000000000000000000000000000000000000",
            "0x0000000000000000000000000000000000000000",
          ),
        ).to.be.revertedWith("No stages");
      });
    });
  });
});
