import * as util from 'util';
import { EnvironmentService } from 'typeorm-model-generator/environment-service';
import { projectTitle } from 'typeorm-model-generator/helpers';

// child_process = spawn subprocesses
// child_process.exec() = uses a shell to execute the command
// util.promisify() = returns a Promise for an Object with stdout and stderr properties
const exec = util.promisify(require('child_process').exec);

const generateEntities = async (): Promise<void> => {
  console.log(`${projectTitle} - ${__filename}`);

  try {
    const {
      RDS_HOSTNAME,
      RDS_DB_NAME,
      RDS_TYPE,
      RDS_PORT,
      RDS_USERNAME,
      RDS_PASSWORD,
      DIR_DATA,
    } = new EnvironmentService().getEnvs();
    await exec(
      `typeorm-model-generator -h ${RDS_HOSTNAME} -d ${RDS_DB_NAME} -e ${RDS_TYPE} -p ${RDS_PORT} -u ${RDS_USERNAME} -x ${RDS_PASSWORD} -o ${DIR_DATA}`,
      (error, stdout, stderr) => {
        if (error) {
          throw error;
        }

        console.log(`${projectTitle} - stdout: ${stdout}`);
        console.log(`${projectTitle} - stderr: ${stderr}`);
      },
    );
  } catch (err) {
    console.error(`${projectTitle} - err ${err}`);
  }
};

generateEntities();
